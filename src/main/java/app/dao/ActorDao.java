package app.dao;

import java.sql.Connection;
import java.sql.SQLException;

import app.domain.Actor;

public final class ActorDao {

    private Connection dbConnection;

    public ActorDao(Connection c) {
        dbConnection = c;
    }

    public void insertActor(Actor newActor) throws SQLException {

        try (var stmt = dbConnection.createStatement()) {
            var sql = String.format("INSERT INTO ACTOR (NAME) VALUES ('%s');", newActor.getName());
            stmt.executeUpdate(sql);
        }
    }

    public void deleteActor(String actorId) throws SQLException {

        try (var stmt = dbConnection.createStatement()) {
            var sql = String.format("DELETE FROM ACTOR WHERE ID = '%s';", actorId);
            stmt.executeUpdate(sql);
        }
    }

    public ActorEntity getOne(String actorId) throws SQLException {

        try (var stmt = dbConnection.createStatement()) {
            var sql = String.format("SELECT * FROM ACTOR WHERE ID = '%s';", actorId);
            ActorEntity actor = stmt.executeQuery(sql);
            return actor;
        }
    }
}
