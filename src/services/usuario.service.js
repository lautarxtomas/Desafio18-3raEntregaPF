import "../configs/db.config.js";
import { UsuariosModel } from "../models/usuarios.model.js";
import logger from "../utils/loggers/Log4jsLogger.js";

import { transporter, options, sendMail } from "../utils/notifications/emailSender.js";
// import { sendSMS, from, body } from "../utils/notifications/smsSender.js";

export class UsuarioService {

    ID_FIELD = "_id";
    USERNAME_FIELD = 'username';
    
    async createUser(object) {
        try {
            sendMail(transporter, options)
            // sendSMS(object.phone, from, body)
            return await UsuariosModel.create(object);
        } catch (error) {
            logger.error(error);
            return null;
        }
    }
    
    async loginUser(object) {
        try {
            const user = await UsuariosModel.findOne({
                [this.USERNAME_FIELD] : object.username
            });
            
            if (!user) {
                logger.info(`User '${object.username}' does not exist`)
                return null;   
            } 
            
            return await user.comparePassword(object.password);
        
        } catch (error) {
            logger.error(error);
            return null;
        }
    }
}