package com.github.kicktheapple.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.lang.reflect.Array;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Random;
import java.util.Scanner;

@RestController


public class SlordleRestController {

    private JwtService jwtService;
    private AuthenticationManager authenticationManager;

    public String theWorld = "BAKER";
    private final UserService service;
    private final ArrayList<String> zbirkaBesed;

    enum Colors {
        WHITE,
        GREEN,
        YELLOW,
        GRAY
    }

    enum dataResponses {
        SUCCESS,
        EXISTS,
        SHORT,
        EMPTY,
    }

    SlordleRestController(UserService service) {
        this.service = service;
        zbirkaBesed = fillingLegalWords("sbsj.txt", 5);
        setSlordle();
    }

    public ArrayList<String> fillingLegalWords(String fileLocation, int length) {
        ArrayList<String> zbirkovalec = new ArrayList<>();
        File besede = new File(fileLocation);
        System.out.println("Exists: " + besede.exists());
        System.out.println("Size: " + besede.length());
        try {
            Scanner scBesed = new Scanner(besede, StandardCharsets.UTF_8);
            while (scBesed.hasNext()) {
                String currentWord = scBesed.nextLine();
                if (currentWord.length() == length) {
                    zbirkovalec.add(currentWord.toUpperCase());
                    System.out.println(currentWord.toUpperCase());
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return zbirkovalec;
    }

    public boolean legality(String guess) {
        return zbirkaBesed.contains(guess);
    }

    @GetMapping("/api/health")
    public String getString() {
        return "Here's a string";
    }

    @GetMapping("/api/generateWord")
    public @ResponseBody Word generateWord() {
        Random random = new Random();
        Word wordler = new Word();
        wordler.beseda = zbirkaBesed.get(random.nextInt(zbirkaBesed.size()));
        return wordler;
    }

    private void setSlordle() {
        Random random = new Random();
        theWorld = zbirkaBesed.get(random.nextInt(zbirkaBesed.size()));
    }

    @PostMapping("/api/AddUser")
    public @ResponseBody InputStates userAddition(@RequestBody UserForm userForm) {
        InputStates states = new InputStates();
        if (service.getUserByUsername(userForm.username) != null) {
            states.usernameStatus = dataResponses.EXISTS.ordinal();
            states.generalStatus = true;
        }
        if (userForm.username.length() < 5) {
            states.usernameStatus = dataResponses.SHORT.ordinal();
            states.generalStatus = true;
        }
        if (userForm.password.length() < 5) {
            states.passwordStatus = dataResponses.SHORT.ordinal();
            states.generalStatus = true;
        }
        if (userForm.username.isEmpty()) {
            states.usernameStatus = dataResponses.EMPTY.ordinal();
        }
        if (userForm.password.isEmpty()) {
            states.passwordStatus = dataResponses.EMPTY.ordinal();
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

    @PostMapping("/api/CheckUser")
    public @ResponseBody InputStates userCheckington(@RequestBody UserForm userForm) {
        InputStates states = new InputStates();
        if (userForm.username.isEmpty()) {
            states.usernameStatus = dataResponses.EMPTY.ordinal();
            states.generalStatus = true;
        }
        if (userForm.password.isEmpty()) {
            states.passwordStatus = dataResponses.EMPTY.ordinal();
            states.generalStatus = true;
        }
        if (service.getUserByUsername(userForm.username) == null || !service.getUserByUsername(userForm.username).checkPassword(userForm.password)) {
            states.usernameStatus = dataResponses.EXISTS.ordinal();
            states.passwordStatus = dataResponses.EXISTS.ordinal();
            states.generalStatus = true;
        }
        return states;
    }

    @PostMapping("/api/generateToken")
    public String authenticateAndGetToken(@RequestBody UserForm authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.username, authRequest.password)
        );
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(authRequest.username);
        } else {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }

    @PostMapping("/api/GuessTest")
    public @ResponseBody Coloring requestHandling(@RequestBody Guess body) {
        Coloring colors = new Coloring(body.word.length());
        if (legality(body.word)) {
            colors.legal = true;
        }
        boolean[] hasBeenUsedArray = new boolean[theWorld.length()];
        for (int i = 0; i < body.word.length(); i++) {
            if (hardGuess(body.word.charAt(i), i)) {
                colors.colors[i] = Colors.GREEN.ordinal();
            } else {
                if (softGuess(body.word.charAt(i), body.word, hasBeenUsedArray)) {
                    colors.colors[i] = Colors.YELLOW.ordinal();
                } else {
                    colors.colors[i] = Colors.GRAY.ordinal();
                }
            }
        }
        return colors;
    }

    public boolean softGuess(char letter, String guess, boolean[] hasBeenUsedArray) {
        for (int i = 0; i < guess.length(); i++) {
            if (letter == theWorld.charAt(i) && !hasBeenUsedArray[i] && theWorld.charAt(i) != guess.charAt(i)) {
                hasBeenUsedArray[i] = true;
                return true;
            }
        }
        return false;
    }

    public boolean hardGuess(char letter, int position) {
        return letter == theWorld.charAt(position);
    }

}


