package app.dao;

import app.domain.Actor;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.UUID;

public final class ActorDao {

    private Connection dbConnection;

    public ActorDao(Connection c) {
        dbConnection = c;
    }

    public UUID insertActor(Actor newActor) throws SQLException {
        UUID id;
        try (var stmt = dbConnection.createStatement()) {
            id = UUID.randomUUID();
            var sql = String.format("INSERT INTO ACTOR (ID, NAME) VALUES ('%s', '%s');", id, newActor.getName());
            stmt.executeUpdate(sql);
        }
        return id;
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
            ActorEntity actor = new ActorEntity();
            var result = stmt.executeQuery(sql);
            if (result.next()) {
                actor.setId(result.getString(1));
                actor.setName(result.getString("name"));
            }
            result.close();
            return actor;
        }
    }
}
