import app from "../server";

app.listen(Number(process.env.PORT ?? 3000));

export default app;
