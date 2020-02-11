package app.controllers;

import io.javalin.http.Context;
import org.jetbrains.annotations.NotNull;

public class ActorController {

    public static void create(@NotNull Context context) {
        context.status(200).result("Hello there!");
    }

    public static void delete(@NotNull Context context) {

    }

    public static void getOne(@NotNull Context context) {
        context.status(200).result("Hello there!");
    }
}
