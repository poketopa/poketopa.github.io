import rss from '@astrojs/rss';
import { SITE } from '../../consts';
import { getPublishedPosts } from '../../utils/posts';

export async function GET(context: { site: URL }) {
  const posts = await getPublishedPosts('en');
  return rss({
    title: `${SITE.title} — English`,
    description: 'Development notes, retrospectives, and book reviews by ludens',
    site: context.site,
    customData: '<language>en</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/en/posts/${post.id}/`,
      categories: [post.data.category],
    })),
  });
}
