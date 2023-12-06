
import { Notification } from "rsuite";

const diccionario = {
    success: "Éxito",
    info: "Información",
    warning: "Precaución",
    error: "Error"
}

export default function Alert({ type, rest, message, errorServer }: {type: 'info' | 'success' | 'warning' | 'error', rest?: any, message: string, errorServer?: boolean}) {
    return (
        <Notification {...rest} type={type} header={diccionario[type]}>
           {errorServer ? "Error al conectarse con el servidor" :  message}
        </Notification>
    );
}