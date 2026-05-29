import {
  Avatar,
  Button,
  Column,
  Heading,
  IconButton,
  Line,
  Media,
  Tag,
  Text,
  Meta,
  Schema,
  Row,
  Icon,
} from "@once-ui-system/core";
import { baseURL, about, person, social } from "@/resources";
import React from "react";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  return (
    <Column maxWidth="m" fillWidth gap="xl" paddingY="12">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* ══ BAGIAN 1: HEADER PROFIL ════════════════════════════════ */}
      <Row fillWidth gap="xl" vertical="center" s={{ direction: "column" }}>
        {/* Foto — Desktop (xl / 160px) */}
        {about.avatar.display && <Avatar src={person.avatar} size="xl" s={{ hide: true }} />}

        {/* Foto — Mobile (size 8 / 128px) */}
        {about.avatar.display && <Avatar src={person.avatar} size={8} hide s={{ hide: false }} />}

        {/* Info nama & tombol */}
        <Column gap="s" flex={1}>
          <Heading variant="display-strong-l">{person.name}</Heading>
          <Text variant="display-default-xs" onBackground="neutral-weak">
            {person.role}
          </Text>
          <Row gap="8" vertical="center" marginTop="4">
            <Icon onBackground="accent-weak" name="globe" />
            <Text variant="body-default-s" onBackground="neutral-weak">
              {person.location}
            </Text>
          </Row>

          {/* Language tags */}
          {person.languages && person.languages.length > 0 && (
            <Row wrap gap="8" marginTop="4">
              {person.languages.map((language, index) => (
                <Tag key={index} size="l">
                  {language}
                </Tag>
              ))}
            </Row>
          )}

          {/* Social links */}
          <Row gap="8" wrap vertical="center" marginTop="8">
            {social
              .filter((item) => item.essential)
              .map(
                (item) =>
                  item.link && (
                    <React.Fragment key={item.name}>
                      <Row s={{ hide: true }}>
                        <Button
                          href={item.link}
                          prefixIcon={item.icon}
                          label={item.name}
                          size="s"
                          weight="default"
                          variant="secondary"
                        />
                      </Row>
                      <Row hide s={{ hide: false }}>
                        <IconButton
                          size="m"
                          href={item.link}
                          icon={item.icon}
                          variant="secondary"
                        />
                      </Row>
                    </React.Fragment>
                  ),
              )}
          </Row>
        </Column>
      </Row>

      {/* ══ BAGIAN 2: PREVIEW CV ═══════════════════════════════════ */}
      <Column fillWidth gap="m">
        <Row fillWidth horizontal="between" vertical="center">
          <Text variant="label-default-s" onBackground="neutral-weak">
            Resume Preview
          </Text>
          <Button
            href="https://drive.google.com/file/d/1C8M1gN6JY6DK_JPDNkmqF0d3w7J3t1OQ/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            prefixIcon="openLink"
            label="Open in Google Drive"
            variant="secondary"
            size="s"
            data-border="rounded"
          />
        </Row>

        <Column
          fillWidth
          background="neutral-alpha-weak"
          border="neutral-alpha-medium"
          radius="l"
          padding="12"
          style={{
            boxShadow: "var(--shadow-l)",
            backdropFilter: "blur(var(--static-space-1))",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "0",
              paddingBottom: "141.4%",
              borderRadius: "var(--radius-m)",
              overflow: "hidden",
              border: "1px solid var(--neutral-border-medium)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
            }}
          >
            <iframe
              src="https://drive.google.com/file/d/1C8M1gN6JY6DK_JPDNkmqF0d3w7J3t1OQ/preview"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
              allow="autoplay"
              title={`${person.name} - Resume`}
              loading="lazy"
            />
          </div>
        </Column>
      </Column>

      {/* ══ DIVIDER ════════════════════════════════════════════════ */}
      <Line background="neutral-alpha-medium" />

      {/* ══ BAGIAN 3: DETAIL ABOUT ═════════════════════════════════ */}
      <Column fillWidth gap="xl">
        {/* Introduction */}
        {about.intro.display && (
          <Column fillWidth gap="m">
            <Heading as="h2" variant="display-strong-s">
              {about.intro.title}
            </Heading>
            <Column textVariant="body-default-l" fillWidth gap="m">
              {about.intro.description}
            </Column>
          </Column>
        )}

        {/* Work Experience */}
        {about.work.display && (
          <Column fillWidth gap="l">
            <Heading as="h2" variant="display-strong-s">
              {about.work.title}
            </Heading>
            <Column fillWidth gap="xl">
              {about.work.experiences.map((experience, index) => (
                <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth>
                  <Row fillWidth horizontal="between" vertical="end" marginBottom="4">
                    <Text id={experience.company} variant="heading-strong-l">
                      {experience.company}
                    </Text>
                    <Text variant="heading-default-xs" onBackground="neutral-weak">
                      {experience.timeframe}
                    </Text>
                  </Row>
                  <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                    {experience.role}
                  </Text>
                  <Column as="ul" gap="16">
                    {experience.achievements.map((achievement: React.ReactNode, i: number) => (
                      <Text as="li" variant="body-default-m" key={`${experience.company}-${i}`}>
                        {achievement}
                      </Text>
                    ))}
                  </Column>
                  {experience.images && experience.images.length > 0 && (
                    <Row fillWidth paddingTop="m" gap="12" wrap>
                      {experience.images.map((image, i) => (
                        <Row
                          key={i}
                          border="neutral-medium"
                          radius="m"
                          minWidth={image.width}
                          height={image.height}
                        >
                          <Media
                            enlarge
                            radius="m"
                            sizes={image.width.toString()}
                            alt={image.alt}
                            src={image.src}
                          />
                        </Row>
                      ))}
                    </Row>
                  )}
                </Column>
              ))}
            </Column>
          </Column>
        )}

        {/* Studies */}
        {about.studies.display && (
          <Column fillWidth gap="l">
            <Heading as="h2" variant="display-strong-s">
              {about.studies.title}
            </Heading>
            <Column fillWidth gap="l">
              {about.studies.institutions.map((institution, index) => (
                <Column key={`${institution.name}-${index}`} fillWidth gap="4">
                  <Text id={institution.name} variant="heading-strong-l">
                    {institution.name}
                  </Text>
                  <Text variant="heading-default-xs" onBackground="neutral-weak">
                    {institution.description}
                  </Text>
                </Column>
              ))}
            </Column>
          </Column>
        )}

        {/* Technical Skills */}
        {about.technical.display && (
          <Column fillWidth gap="l">
            <Heading as="h2" variant="display-strong-s">
              {about.technical.title}
            </Heading>
            <Column fillWidth gap="l">
              {about.technical.skills.map((skill, index) => (
                <Column key={`${skill.title}-${index}`} fillWidth gap="4">
                  <Text id={skill.title} variant="heading-strong-l">
                    {skill.title}
                  </Text>
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    {skill.description}
                  </Text>
                  {skill.tags && skill.tags.length > 0 && (
                    <Row wrap gap="8" paddingTop="8">
                      {skill.tags.map((tag, tagIndex) => (
                        <Tag key={`${skill.title}-${tagIndex}`} size="l" prefixIcon={tag.icon}>
                          {tag.name}
                        </Tag>
                      ))}
                    </Row>
                  )}
                  {skill.images && skill.images.length > 0 && (
                    <Row fillWidth paddingTop="m" gap="12" wrap>
                      {skill.images.map((image, i) => (
                        <Row
                          key={i}
                          border="neutral-medium"
                          radius="m"
                          minWidth={image.width}
                          height={image.height}
                        >
                          <Media
                            enlarge
                            radius="m"
                            sizes={image.width.toString()}
                            alt={image.alt}
                            src={image.src}
                          />
                        </Row>
                      ))}
                    </Row>
                  )}
                </Column>
              ))}
            </Column>
          </Column>
        )}
      </Column>
    </Column>
  );
}
