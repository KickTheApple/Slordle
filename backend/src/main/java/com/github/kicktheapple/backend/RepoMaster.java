package com.github.kicktheapple.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RepoMaster extends JpaRepository<UserData, Long> {
    UserData findByUsername(@Param("username") String username);
}