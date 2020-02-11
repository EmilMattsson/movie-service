package app;

import app.controllers.ActorController;
import app.controllers.MovieController;
import io.javalin.Javalin;

import java.sql.DriverManager;
import java.sql.SQLException;

import static io.javalin.apibuilder.ApiBuilder.*;

public class Application {

    public static void main(String[] args) {

        try {
            DriverManager.getConnection("jdbc:postgresql://localhost:5432/MovieServiceDB",
                    "movieservice", "something");
        } catch (SQLException exception) {
            System.err.println(exception.getMessage());
        }

        Javalin app = Javalin.create();
        app.routes(() -> {
            path("actors", () -> {
                post(ActorController::create);
                path(":id", () -> {
                    get(ActorController::getOne);
                    delete(ActorController::delete);
                });
            });
            path("movies", () -> {
                post(MovieController::create);
                path(":id", () -> {
                    get(MovieController::getOne);
                    delete(MovieController::delete);
                });
            });
        }).start(7000);
    }
}
