"use server";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Link,
  Img,
  Text,
} from "@react-email/components";

const BirthdayWishEmail = ({ name }: { name: string }) => {
  return (
    <Html>
      <Head />
      <Preview>It&apos;s {name}&apos;s Birthday!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={contentSection}>
            <Heading style={heading1}>Hola Amigo Friend!</Heading>
            <Heading style={heading2}>
              It&apos;s {name}&apos;s birthday today...
            </Heading>

            <Heading style={heading3}>
              Dont forget to wish him! Send this custom animated birthday
              website to them:
              <Link href="https://happppyy-bday.vercel.app/" style={link}>
                THISS!
              </Link>
            </Heading>
            <Img
              src="https://gifdb.com/images/high/yay-milk-and-mocha-bears-cheering-confetti-9rjvz35rjxvj7oup.gif"
              alt="yay"
              style={image}
            />
            <Text style={message}>--- from Anish</Text>

            <Text style={footer}>Have a great day !!!!</Text>
          </Section>
          <Section style={footerSection}>
            <Text style={footerText}>
              Sent using:{" "}
              <Link
                style={{
                  color: "#d416ff",
                  textDecoration: "none",
                }}
                href="https://bday-reminder7.vercel.app/"
              >
                Bday Reminder App
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
  fontFamily: "sans-serif",
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

const contentSection = {
  padding: "4px",
};

const heading1 = {
  color: "#333333",
  fontSize: "24px",
  fontWeight: "bold",
};

const heading2 = {
  color: "#333333",
  fontSize: "20px",
  fontWeight: "bold",
};

const heading3 = {
  fontSize: "18px",
  fontWeight: "bold",
};

const link = {
  color: "#ff4968",
  textDecoration: "underline",
};

const message = {
  color: "white",
  fontSize: "16px",
  margin: "20px 0",
};

const image = {
  width: "100%",
  height: "auto",
  borderRadius: "8px",
};

const footer = {
  color: "#555555",
  fontSize: "16px",
  margin: "20px 0",
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

export default BirthdayWishEmail;
