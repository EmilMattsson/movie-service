package app.controllers;

import java.sql.Connection;
import java.sql.SQLException;

import app.dao.ActorDao;
import app.domain.Actor;
import io.javalin.http.Context;
import io.javalin.plugin.json.JavalinJson;
import org.jetbrains.annotations.NotNull;

public class ActorController {

    private ActorDao actorDao;

    public ActorController(Connection dbConnection) {
        actorDao = new ActorDao(dbConnection);
    }

    public void create(@NotNull Context context) throws SQLException {
        Actor newActor = JavalinJson.fromJson(context.body(), Actor.class);
        actorDao.insertActor(newActor);
        context.status(200).json(newActor);
    }

    public void delete(@NotNull Context context) {
        String actorId = context.pathParam("id");
        context.status(200).result(actorId);
    }

    public void getOne(@NotNull Context context) throws SQLException {
        String actorId = context.pathParam("id");;
        context.status(201).json(actorDao.getOne(actorId));
    }
}
