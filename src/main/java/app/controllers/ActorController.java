package app.controllers;

import app.dao.ActorDao;
import app.domain.Actor;
import io.javalin.http.Context;
import io.javalin.plugin.json.JavalinJson;
import org.jetbrains.annotations.NotNull;

import java.sql.Connection;
import java.sql.SQLException;

public class ActorController {

    private ActorDao actorDao;

    public ActorController(Connection dbConnection) {
        actorDao = new ActorDao(dbConnection);
    }

    public void create(@NotNull Context context) throws SQLException {
        Actor newActor = JavalinJson.fromJson(context.body(), Actor.class);
        context.status(201).json(actorDao.insertActor(newActor));
    }

    public void delete(@NotNull Context context) throws SQLException {
        String actorId = context.pathParam("id");
        actorDao.deleteActor(actorId);
        context.status(204).result("");
    }

    public void getOne(@NotNull Context context) throws SQLException {
        String actorId = context.pathParam("id");;
        context.status(201).json(actorDao.getOne(actorId));
    }
}
