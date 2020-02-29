package app;

import static io.javalin.apibuilder.ApiBuilder.delete;
import static io.javalin.apibuilder.ApiBuilder.get;
import static io.javalin.apibuilder.ApiBuilder.path;
import static io.javalin.apibuilder.ApiBuilder.post;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import app.controllers.ActorController;
import app.controllers.MovieController;
import io.javalin.Javalin;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Application {

    private static final Logger LOGGER = LoggerFactory.getLogger(Application.class);
    private static Connection dbConnection = null;

    public static void main(String[] args) {
        connectToDB();
        var actorController = new ActorController(dbConnection);
        var movieController = new MovieController(dbConnection);

        Javalin app = Javalin.create();
        app.routes(() -> {
            path("/api/actors", () -> {
                post(actorController::create);
                path(":id", () -> {
                    get(actorController::getOne);
                    delete(actorController::delete);
                });
            });
            path("/api/movies", () -> {
                post(movieController::create);
                path(":id", () -> {
                    get(movieController::getOne);
                    delete(movieController::delete);
                });
            });
        }).start(4000);
    }

    private static void connectToDB() {
        try {
            dbConnection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/MovieServiceDB",
                    "movieservice", "try_to.guessMYPWD1337");
            LOGGER.info("connected to DB");
        } catch (SQLException e) {
            LOGGER.error(e.getMessage());
        }
    }
}
