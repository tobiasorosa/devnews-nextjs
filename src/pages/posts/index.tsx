import { GetStaticProps } from 'next';
import SEO from '../../components/SEO';
import { RichText } from 'prismic-dom';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import styles from './posts.module.scss';
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';

interface Post {
	slug: string;
	title: string;
	excerpt: string;
	updatedAt: string;
}

interface PostsProps {
	posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
	return (
		<>
			<SEO title='Posts' />

			<main className={styles.container}>
				<div className={styles.posts}>
					{posts.map(post => (
						<Link href={`/posts/${post.slug}`} key={post.slug}>
							<a>
								<time>{post.updatedAt}</time>
								<strong>{post.title}</strong>
								<p>{post.excerpt}</p>
							</a>
						</Link>
					))}
				</div>
			</main>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const prismic = getPrismicClient();

	const response = await prismic.query(
		[Prismic.predicates.at('document.type', 'post')],
		{
			fetch: ['post.title', 'post.content'],
		}
	);

	const posts = response.results.map(post => {
		return {
			slug: post.uid,
			title: RichText.asText(post.data.title),
			excerpt:
				post.data.content.find(content => content.type === 'paragraph')?.text ??
				'',
			updatedAt: format(
				new Date(post.last_publication_date),
				"d 'de' MMMM 'de' yyyy",
				{ locale: ptBR }
			),
		};
	});

	return {
		props: {
			posts,
		},
		revalidate: 60 * 60 * 12,
	};
};
