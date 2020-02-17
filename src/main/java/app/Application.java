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
    private static ActorController actorController;

    public static void main(String[] args) {
        init();

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
                post(MovieController::create);
                path(":id", () -> {
                    get(MovieController::getOne);
                    delete(MovieController::delete);
                });
            });
        }).start(4000);
    }

    private static void init() {
        try {
            Class.forName("org.postgresql.Driver");
            Connection dbConnection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/MovieServiceDB",
                    "movieservice", "Aurora.");
            actorController = new ActorController(dbConnection);
            LOGGER.info("connected to DB");
        } catch (SQLException | ClassNotFoundException exception) {
            LOGGER.error(exception.getMessage());
        }
    }
}
