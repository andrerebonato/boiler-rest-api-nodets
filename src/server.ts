import path from "path";

import app from './app';
import logger from "./Services/Log/LogErrorService";

let classPath: string = path.basename(__filename);

const port = 3333;
logger.dispatch(classPath, logger.types.info, `Starting service at port: ${port}`);

app.listen(port);
logger.dispatch(classPath, logger.types.info, `Service stated at port: ${port}`);

