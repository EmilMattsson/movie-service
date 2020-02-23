package app.dao;

import app.domain.Movie;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.UUID;

public final class MovieDao {

    private Connection dbConnection;

    public MovieDao(Connection connection) {
        this.dbConnection = connection;
    }

    public UUID insertMovie(Movie movie) throws SQLException {
        UUID id;
        try (var stmt = dbConnection.createStatement()) {
            var doesActorsExist = "";

            id = UUID.randomUUID();
            var insertMovie = String.format("INSERT INTO MOVIE (ID, TITLE, YEAR) VALUES ('%s', '%s', '%d');"
                    , id, movie.getTitle(), movie.getYear());
            var insertActorInMovie = String.format("INSERT INTO ACTOR_IN_MOVIE (MOVIE_ID, ACTOR_ID) VALUES ('%s', '%s');"
                    , id, );
            stmt.executeUpdate(insertMovie);
        }
        return id;
    }
}
