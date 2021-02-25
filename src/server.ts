import path from "path";
import { createServer } from "http";

import app from './app';
import logger from "./Services/Log/LogErrorService";

let classPath: string = path.basename(__filename);

const http = createServer(app);
const port = app.get("port");

http.listen(port);
logger.dispatch(classPath, logger.types.info, `Starting service at port: ${port}`);

logger.dispatch(classPath, logger.types.info, `Service stated at port: ${port}`);

