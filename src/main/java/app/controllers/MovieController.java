package app.controllers;

import java.sql.Connection;
import java.sql.SQLException;

import app.dao.MovieDao;
import app.domain.Movie;
import io.javalin.http.Context;
import io.javalin.plugin.json.JavalinJson;
import org.jetbrains.annotations.NotNull;

public class MovieController {

    private final MovieDao movieDao;

    public MovieController(Connection dbConnection) {
        this.movieDao = new MovieDao(dbConnection);
    }

    public void create(@NotNull Context context) throws SQLException {
        Movie movie = JavalinJson.fromJson(context.body(), Movie.class);
        if (movie.getTitle() == null || movie.getYear() < 0) {
            context.status(400).result("Bad Request");
        } else {
            context.status(200).json(movieDao.insertMovie(movie));
        }
    }

    public static void getOne(@NotNull Context context) {
        context.result("get one");
    }

    public static void delete(@NotNull Context context) {
        context.result("delete");
    }
}
