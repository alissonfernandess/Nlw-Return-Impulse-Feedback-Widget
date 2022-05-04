import { useState } from 'react'
import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'
import { CloseButton } from '../CloseButton'
import { FeedbackContentStep } from './FeedbackContentStep'
import { FeedbackSuccessStep } from './FeedbackSuccessStep'
import { FeedbackTypeStep } from './FeedbackTypeStep '

export const feedbackTypes = {
	BUG: {
		title: 'Problema',
		image: {
			source: bugImageUrl,
			alt: 'Ilustração de um insete roxo'
		}
	},
	IDEA: {
		title: 'Problema',
		image: {
			source: ideaImageUrl,
			alt: 'Lâmpada acesa'
		}
	},
	OTHER: {
		title: 'Outro',
		image: {
			source: thoughtImageUrl,
			alt: 'Núvem de pensamento'
		}
	},
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {

	const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
	const [feedbackSent, setFeedbackSent] = useState(false);

	function handleRestartFeedback() {
		setFeedbackSent(false)
		setFeedbackType(null)
	}

	return (
		<div className='bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto'>
			{feedbackSent ? (
				<FeedbackSuccessStep 
					onFeedbackRestartRequested={handleRestartFeedback}
				/>
			) : (
				<>
					{!feedbackType ? (
						<FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType}/>
					) : (
						<FeedbackContentStep
							feedbackType={feedbackType}
							onFeedbackRestartRequested={handleRestartFeedback}
							onFeedbackSent={() => setFeedbackSent(true)}
						/>
					)}
				</>
			)}

			<footer className='text-xs text-neutral-400'>
				Feito com ♥ pela <a href="https://rocketseat.com.br" className="underline underline-offset-2">Rocketseat</a>
			</footer>
		</div>
	)
}