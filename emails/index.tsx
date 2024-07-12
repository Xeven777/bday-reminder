"use server";
import React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Img,
  Text,
  Button,
  Link,
} from "@react-email/components";

export const BirthdayEmail = ({
  recipientName,
  senderName,
}: {
  recipientName: string;
  senderName: string;
}) => {
  return (
    <Html>
      <Head />
      <Preview>Happy Birthday {recipientName}!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerSection}>
            <Img
              src="https://i.postimg.cc/JnYKWzkk/bdayimg.jpg"
              alt="Happy Birthday"
              style={headerImage}
            />
          </Section>
          <Section style={contentSection}>
            <Heading style={heading}>Happy Birthday, {recipientName}!</Heading>
            <Text style={paragraph}>
              Wishing you a day as bright and beautiful as you are! May your
              birthday be filled with love, laughter, and all your favorite
              things. Here&apos;s to another year of adventure, growth, and
              making unforgettable memories. Happy Birthday!🤩🎂🥳🥳❤️✨
            </Text>
            <Text style={paragraph}>
              On your special day and always, may your heart be filled with joy,
              your spirit be lifted with hope, and your life be blessed with
              love. Wishing you a great birthday again!!🤩🎂
            </Text>
            <Text style={paragraph}>Sincerely,</Text>
            <Text style={paragraph}>{senderName}</Text>
            <Button
              style={button}
              href={"https://openme.vercel.app/b/" + btoa(recipientName)}
            >
              Surprise Gift🥹✨
            </Button>
          </Section>
          <Section style={footerSection}>
            <Text style={footerText}>
              Sent using:{" "}
              <Link
                style={{
                  color: "#d416ff",
                  textDecoration: "none",
                }}
                href="https://bday-reminder-iota.vercel.app/"
              >
                https://bday-reminder-iota.vercel.app/
              </Link>
            </Text>
            <Text style={footerText}>Phone: +91 9163300481</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: "Arial, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  margin: "40px auto",
  padding: "20px",
  width: "80%",
  maxWidth: "600px",
};

const headerSection = {
  textAlign: "center" as const,
};

const headerImage = {
  borderRadius: "8px",
  width: "100%",
  boxShadow: "0 2px 10px rgb(240 39 223 / 50%)",
  height: "auto",
};

const contentSection = {
  textAlign: "center" as const,
};

const heading = {
  color: "#333333",
  fontSize: "24px",
  fontWeight: "bold",
};

const paragraph = {
  color: "#555555",
  fontSize: "16px",
  lineHeight: "1.5",
  margin: "20px 0",
};


const button = {
  backgroundColor: "#b211db",
  border: "none",
  borderRadius: "5px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  padding: "10px 20px",
  textDecoration: "none",
  marginTop: "20px",
};

const footerSection = {
  textAlign: "center" as const,
  borderTop: "1px solid #e0e0e0",
  marginTop: "20px",
  paddingTop: "20px",
};

const footerText = {
  color: "#888888",
  fontSize: "14px",
};

export default BirthdayEmail;
