/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Content, Loader } from "rsuite";
import { useEffect, useState } from "react";


export default function Layout(props: any) {
    return (
        <Container className="m-0" style={{ minHeight: "25vh" }}>
            <Container className={true ? "main-content" : ""}>
                <Content className="d-flex align-items-center p-1 p-sm-3 p-md-4 p-lg-5">
                    {props.children}
                </Content>
            </Container>
        </Container>
    );
}
