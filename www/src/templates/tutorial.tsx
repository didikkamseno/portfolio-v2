import * as React from "react"
import { PageProps, graphql, HeadFC } from "gatsby"
import { WritingViewDataProps, WritingView } from "../components/writing/writing-view"
import { Heading, Text } from "../components/typography"
import { Box, Spacer, Tag } from "../components/primitives"
import { SEO } from "../components/seo"
import { article } from "../constants/json-ld"

const tagColorSwitch = (name) => {
  switch (name) {
    case `Community`:
      return `green`
    case `Design`:
      return `blue`
    case `Gatsby`:
      return `purple`
    case `JavaScript`:
      return `yellow`
    case `React`:
      return `teal`
    default:
      return `gray`
  }
}

const TutorialTemplate: React.FC<PageProps<WritingViewDataProps>> = ({
  data: { post },
  location: { pathname },
  children: mdxContent,
}) => (
  <WritingView post={post} mdxContent={mdxContent} pathname={pathname} type="tutorial">
    <Heading as="h1">{post.title}</Heading>
    <Spacer size="6" axis="vertical" />
    <Box as="hr" height="px" width="full" bg="text" opacity={0.1} border="none" />
    <Spacer size="4" axis="vertical" />
    <Box display="flex" justifyContent="space-between" flexDirection={[`column`, null, null, `row`]}>
      <Text marginBottom="2">
        Created {post.date} – Last Updated {post.lastUpdated}
      </Text>
      <Tag marginBottom="2" colorScheme={tagColorSwitch(post.category.name)} style={{ alignSelf: `flex-start` }}>
        {post.category.name}
      </Tag>
    </Box>
    <Spacer size="10" axis="vertical" />
  </WritingView>
)

export default TutorialTemplate

export const Head: HeadFC<WritingViewDataProps> = ({ data: { post } }) => (
  <SEO
    title={post.title}
    pathname={post.slug}
    description={post.description ? post.description : post.excerpt}
    image={post.image}
  >
    <meta name="twitter:label1" value="Time To Read" />
    <meta name="twitter:data1" value={`${post.timeToRead} Minutes`} />
    <meta name="twitter:label2" value="Category" />
    <meta name="twitter:data2" value={post.category.name} />
    <meta name="article:published_time" content={post.seoDate} />
    <meta name="article:modified_time" content={post.seoLastUpdated} />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          article({
            isGarden: false,
            post: {
              title: post.title,
              description: post.description ? post.description : post.excerpt,
              date: post.seoDate,
              lastUpdated: post.seoLastUpdated,
              year: post.yearDate,
              image: post.image,
              slug: post.slug,
            },
            category: {
              name: post.category.name,
              slug: post.category.slug,
            },
          })
        ),
      }}
    />
  </SEO>
)

export const query = graphql`
  query ($id: String!) {
    post(id: { eq: $id }) {
      ...WritingView
      tableOfContents
    }
  }
`
