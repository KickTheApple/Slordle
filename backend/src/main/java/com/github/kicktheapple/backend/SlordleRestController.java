package com.github.kicktheapple.backend;

import org.springframework.web.bind.annotation.*;

@RestController
public class SlordleRestController {

    public String theWorld = "BAKER";

    @GetMapping("/api/test")
    public String getString() {
        return "Here's a string";
    }

    @PostMapping("/api/GuessTest")
    public @ResponseBody Guess requestHandling(@RequestBody Guess body) {
        return body;
    }

    public boolean softGuess() {
        return false;
    }

    public boolean hardGuess() {
        return false;
    }

}
