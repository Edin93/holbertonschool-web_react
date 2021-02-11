interface MajorCredits {
	credits: number;
	brand: 'brandA';
}

interface MinorCredits {
	credits: number;
	brand: 'brandB';
}

function sumMajorCredits (subject1: number, subject2: number) : number {
	return subject1 + subject2;
}

function sumMinorCredits (subject1: number, subject2: number) : number {
	return subject1 + subject2;
}
