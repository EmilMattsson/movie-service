package app.dao;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.UUID;

import app.domain.Movie;

public final class MovieDao {

    private Connection dbConnection;

    public MovieDao(Connection connection) {
        this.dbConnection = connection;
    }

    public UUID insertMovie(Movie movie) throws SQLException {
        UUID id;
        try (var stmt = dbConnection.createStatement()) {
            var actorIds = movie.getActors();
            if (!actorIds.isEmpty()) {
                var doesActorsExist = String.format("SELECT COUNT(*) FROM ACTOR WHERE ID IN(%s);",
                        actorIds.toString()
                                .replace('[', '\'')
                                .replace(']', '\'')
                                .replace(", ", "', '"));
                stmt.executeQuery(doesActorsExist);
            }

            id = UUID.randomUUID();
            var insertMovie = String.format("INSERT INTO MOVIE (ID, TITLE, YEAR) VALUES ('%s', '%s', '%d');"
                    , id, movie.getTitle(), movie.getYear());
            stmt.executeUpdate(insertMovie);

            actorIds.forEach(actorId -> {
                var insertActorInMovie = String.format("INSERT INTO ACTOR_IN_MOVIE (MOVIE_ID, ACTOR_ID) VALUES ('%s', '%s');"
                        , id, actorId);
                try {
                    stmt.executeUpdate(insertActorInMovie);
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            });
        }
        return id;
    }
}
