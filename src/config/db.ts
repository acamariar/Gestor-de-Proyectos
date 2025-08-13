import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async () => {
  try {
    const conexition = await mongoose.connect(process.env.DATABASE_URL!);
    const url = `${conexition.connection.host}:${conexition.connection.port}`;
    console.log(colors.cyan.bold(`mongoDB Conectado en:  ${url}`));
  } catch (error) {
    console.log(colors.red.bold("error al conectar a mongoDB"));
    process.exit(1);
  }
};
