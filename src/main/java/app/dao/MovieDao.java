package app.dao;

import static java.lang.Integer.parseInt;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.UUID;

import app.domain.Movie;
import org.jetbrains.annotations.NotNull;

public class MovieDao {

    private Connection dbConnection;

    public MovieDao(@NotNull Connection connection) {
        this.dbConnection = connection;
    }

    public UUID insertMovie(Movie movie) throws SQLException {
        UUID id;
        try (var stmt = dbConnection.createStatement()) {
            var actorIds = movie.getActors();
            if (!actorIds.isEmpty()) {
                var doesActorsExist = String.format("SELECT COUNT(*) FROM ACTOR WHERE ID IN(%s);", actorIds.toString()
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

    public MovieEntity getMovie(String id) throws SQLException {
        MovieEntity movie = new MovieEntity();
        var getMovie = String.format("SELECT * FROM MOVIE WHERE ID = '%s';", id);
        var getActorsInMovie = String.format("SELECT ACTOR_ID FROM ACTOR_IN_MOVIE WHERE MOVIE_ID = '%s';", id);
        try (var stmt = dbConnection.createStatement()){

            var movieQueryResult = stmt.executeQuery(getMovie);
            if (movieQueryResult.next()) {
                movie.setId(movieQueryResult.getString("id"));
                movie.setTitle(movieQueryResult.getString("title"));
                movie.setYear(parseInt(movieQueryResult.getString("year")));
            }
            movieQueryResult.close();

            var actorInMovieQueryResult = stmt.executeQuery(getActorsInMovie);
            var actorIds = new ArrayList<String>();
            while (actorInMovieQueryResult.next()) {
                actorIds.add(actorInMovieQueryResult.getString("actor_id"));
            }
            movie.setActors(actorIds);
            actorInMovieQueryResult.close();

            return movie;
        }
    }

    public void deleteMovie(String id) throws SQLException {
        var deleteMovieQuery = String.format("DELETE FROM MOVIE WHERE ID = '%s'", id);
        var deleteActorInMovieQuery = String.format("DELETE FROM ACTOR_IN_MOVIE WHERE MOVIE_ID = '%s'", id);
        try (var stmt = dbConnection.createStatement()) {
            stmt.executeUpdate(deleteMovieQuery);
            stmt.executeUpdate(deleteActorInMovieQuery);
        }
    }
}
