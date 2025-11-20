package com.github.kicktheapple.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private RepoMaster repoMaster;

    public List<UserData> getAllUsers() {
        return repoMaster.findAll();
    }

    public UserData getUserById(Long id) {
        return repoMaster.findById(id).orElse(null);
    }

    public UserData getUserByUsername(String username) {
        return repoMaster.findByUsername(username);
    }

    public UserData createUser(UserData user) {
        return repoMaster.save(user);
    }

    public void deleteUser(Long id) {
        repoMaster.deleteById(id);
    }
}