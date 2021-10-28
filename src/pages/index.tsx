import SEO from '../components/SEO';
import Image from 'next/image';

import styles from '../styles/home.module.scss';

export default function Home() {
	return (
		<>
			<SEO title='Dev News!' excludeTitleSuffix />

			<main className={styles.content}>
				<section className={styles.section}>
					<span>Olá Dev!</span>
					<h1>
						Bem-vindo e bem-vinda <br />
						ao <span>Dev</span>News!
					</h1>
					<p>
						Um blog com conteúdos extremamente <br />
						<span>relevantes para o seu aprendizado.</span>
					</p>
				</section>

				<Image src='/home.svg' alt='Home image' width='450' height='450' />
			</main>
		</>
	);
}
