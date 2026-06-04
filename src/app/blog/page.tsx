import { Posts } from "@/components/blog/Posts";
import { baseURL, blog, person } from "@/resources";
import { Column, Flex, Heading, Line, Meta, Row, Schema, Text } from "@once-ui-system/core";

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: blog.path,
  });
}

export default function Blog() {
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Header Section — personal, bukan template */}
      <Column paddingX="l" paddingBottom="40" gap="16">
        <Text
          variant="label-strong-s"
          onBackground="brand-medium"
          style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
        >
          Blog
        </Text>
        <Heading variant="display-strong-m">{blog.title}</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak" style={{ maxWidth: "560px" }}>
          {blog.description}
        </Text>
      </Column>

      <Column fillWidth flex={1} gap="48">
        {/* Featured post — paling baru, ditampilkan besar dengan thumbnail */}
        <Column gap="0">
          <Posts range={[1, 1]} thumbnail />
        </Column>

        {/* 2 post berikutnya — side by side dengan thumbnail */}
        <Posts range={[2, 3]} columns="2" thumbnail direction="column" />

        {/* Divider + All posts section with thumbnails */}
        <Column paddingX="l" gap="32">
          <Row fillWidth gap="24" vertical="center">
            <Line flex={1} background="neutral-alpha-medium" />
            <Text variant="label-default-s" onBackground="neutral-weak">
              All Posts
            </Text>
            <Line flex={1} background="neutral-alpha-medium" />
          </Row>
          <Posts range={[4]} columns="2" thumbnail direction="column" />
        </Column>
      </Column>
    </Column>
  );
}
