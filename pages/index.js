import {
  Box,
  Icon,
  Button,
  Text,
  TextField,
  Image,
} from "@skynexui/components";
import { useState } from "react";
import appConfig from "../config.json";
import React from "react";
import { useRouter } from "next/router";

function Title(props) {
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals["000"]};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

export default function PaginaInicial() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const [data, setData] = useState([]);
  const imagemError =
    "https://png.pngitem.com/pimgs/s/214-2142530_kawaii-blue-sad-eyes-eye-blush-face-caritas.png";

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage:
            "url(https://i.dlpng.com/static/png/6641954_preview.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            borderRadius: "5px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              console.log("Alguém submeteu o form");
              router.push("/chat");
            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Title tag="h2">Welcome back!</Title>

            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[300],
              }}
            >
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              onChange={function (event) {
                console.log("usuario ", event.target.value);
                const valor = event.target.value;
                setUsername(valor);
                fetch(`https://api.github.com/users/${valor}`)
                  .then((r) => r.json())
                  .then((data) => {
                    setData(data);
                  });
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            {username.length > 2 &&
              username.length !== null &&
              username.trim() && (
                <Button
                  type="submit"
                  label="Entrar"
                  fullWidth
                  buttonColors={{
                    contrastColor: appConfig.theme.colors.neutrals["400"],
                    mainColor: appConfig.theme.colors.primary[500],
                    mainColorLight: appConfig.theme.colors.primary[400],
                    mainColorStrong: appConfig.theme.colors.primary[600],
                  }}
                  styleSheet={{
                    color: appConfig.theme.colors.primary[1000],
                    hover: {
                      boxShadow: " 0 0 2em rgb( 252,187,255,0.75)",
                    },
                  }}
                />
              )}
            <br></br>
            <a href="https://github.com/lusntgo">
              <Icon
                label="Icon Component"
                name="FaGithub"
                size="2.6ch"
                styleSheet={{
                  color: "#fae1dd",
                }}
              />
            </a>
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: "1px solid",
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: "10px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              styleSheet={{
                borderRadius: "50%",
                marginBottom: "16px",
              }}
              src={
                username.length > 2 &&
                username.length !== null &&
                username.trim()
                  ? `https://github.com/${username}.png`
                  : imagemError
              }
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              {username.length > 2 &&
              username.length !== null &&
              username.trim()
                ? username
                : "O campo está vazio!"}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
