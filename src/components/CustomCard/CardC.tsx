import { Card } from "react-bootstrap";

type Shadow = 'none' | 'sm' | 'lg';

export default function CardC({children, title, shadow, className, style, backgroundColor}: {children: React.ReactNode, shadow?: Shadow, title?: string, className?: string, style?: any, backgroundColor?: string}){

    function setClass(){
        let clase = "border-0 flex-fill ch-res shadow";
        if(shadow) clase += `-${shadow}`;
        if(className) clase += ` ${className}`;
        return clase;
    }

    return(
        <Card className={`${setClass()} ${backgroundColor ? `bg-${backgroundColor}` : ''}`} style={style}>
            {
                title && 
                <Card.Header  as="h4" className={`bg-${backgroundColor || 'white'}  text-white border-0 pb-0`}>
                    {title}
                </Card.Header>
            }
            <Card.Body className="pt-3 pb-4">
                {children}
            </Card.Body>
        </Card>
    )
}
