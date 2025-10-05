package com.github.kicktheapple.backend;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:5173")
public class SlordleRestController {

    public String theWorld = "BAKER";

    enum Colors {
        WHITE,
        GREEN,
        YELLOW,
        GRAY
    }

    @GetMapping("/api/test")
    public String getString() {
        return "Here's a string";
    }

    @PostMapping("/api/GuessTest")
    public @ResponseBody Coloring requestHandling(@RequestBody Guess body) {
        Coloring colors = new Coloring(body.word.length());
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
