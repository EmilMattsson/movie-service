package app.controllers;

import io.javalin.http.Context;
import org.jetbrains.annotations.NotNull;

public class MovieController {

    public static void create(@NotNull Context context) {
        context.result("MOVIES!");
    }

    public static void getOne(@NotNull Context context) {
        context.result("get one");
    }

    public static void delete(@NotNull Context context) {
        context.result("delete");
    }
}
