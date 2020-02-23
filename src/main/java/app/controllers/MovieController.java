package app.controllers;

import app.domain.Movie;
import io.javalin.http.Context;
import io.javalin.plugin.json.JavalinJson;
import org.jetbrains.annotations.NotNull;

public class MovieController {

    public static void create(@NotNull Context context) {
        Movie movie = JavalinJson.fromJson(context.body(), Movie.class);
        context.status(201).json(movie);
    }

    public static void getOne(@NotNull Context context) {
        context.result("get one");
    }

    public static void delete(@NotNull Context context) {
        context.result("delete");
    }
}
