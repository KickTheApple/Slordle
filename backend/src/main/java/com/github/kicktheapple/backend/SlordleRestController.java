package com.github.kicktheapple.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Scanner;

@RestController
//@CrossOrigin("http://localhost:5173")
public class SlordleRestController {

    public String theWorld = "BAKER";
    private final UserService service;
    private final ArrayList<String> zbirkaBesed;

    enum Colors {
        WHITE,
        GREEN,
        YELLOW,
        GRAY
    }

    enum addingResponses {
        SUCCESS,
        EXISTS,
        SHORT,
        EMPTY,
    }

    SlordleRestController(UserService service) {
        this.service = service;
        zbirkaBesed = fillingLegalWords("backend/src/main/java/com/github/kicktheapple/backend/sbsj.txt", 5);
    }

    public ArrayList<String> fillingLegalWords(String fileLocation, int length) {
        ArrayList<String> zbirkovalec = new ArrayList<>();
        File besede = new File(fileLocation);
        try {
            Scanner scBesed = new Scanner(besede);
            while (scBesed.hasNext()) {
                String currentWord = scBesed.nextLine();
                if (currentWord.length() == length) {
                    zbirkovalec.add(currentWord.toUpperCase());
                    System.out.println(currentWord.toUpperCase());
                }
            }
        } catch (Exception ignored) {}
        return zbirkovalec;
    }

    public boolean legality(String guess) {
        return zbirkaBesed.contains(guess);
    }

    @GetMapping("/api/health")
    public String getString() {
        return "Here's a string";
    }

    @PostMapping("/api/AddUser")
    public @ResponseBody InputStates userAddition(@RequestBody UserForm userForm) {
        InputStates states = new InputStates();
        if (service.getUserByUsername(userForm.username) != null) {
            states.usernameStatus = addingResponses.EXISTS.ordinal();
            states.generalStatus = true;
        }
        if (userForm.username.length() < 5) {
            states.usernameStatus = addingResponses.SHORT.ordinal();
            states.generalStatus = true;
        }
        if (userForm.password.length() < 5) {
            states.passwordStatus = addingResponses.SHORT.ordinal();
            states.generalStatus = true;
        }
        if (userForm.username.isEmpty()) {
            states.usernameStatus = addingResponses.EMPTY.ordinal();
        }
        if (userForm.password.isEmpty()) {
            states.passwordStatus = addingResponses.EMPTY.ordinal();
        }
        if (states.generalStatus) {
            return states;
        }
        UserData data = new UserData();
        data.setUsername(userForm.username);
        data.setPassword(userForm.password);
        service.createUser(data);
        return states;
    }

    @PostMapping("/api/GuessTest")
    public @ResponseBody Coloring requestHandling(@RequestBody Guess body) {
        Coloring colors = new Coloring(body.word.length());
        if (legality(body.word)) {
            colors.legal = true;
        }
        for (int i = 0; i < body.word.length(); i++) {
            if (hardGuess(body.word.charAt(i), i)) {
                colors.colors[i] = Colors.GREEN.ordinal();
            } else {
                if (softGuess(body.word.charAt(i), body.word)) {
                    colors.colors[i] = Colors.YELLOW.ordinal();
                } else {
                    colors.colors[i] = Colors.GRAY.ordinal();
                }
            }
        }
        return colors;
    }

    public boolean softGuess(char letter, String guess) {
        for (int i = 0; i < guess.length(); i++) {
            if (letter == theWorld.charAt(i) && theWorld.charAt(i) != guess.charAt(i)) {
                return true;
            }
        }
        return false;
    }

    public boolean hardGuess(char letter, int position) {
        return letter == theWorld.charAt(position);
    }

}


