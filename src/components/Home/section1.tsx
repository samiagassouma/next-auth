type Props = {
    title: string;
    subtitle: string;
    imageSrc: string;
};

export default function Section1({ title, subtitle, imageSrc }: Props) {

    return (
        <div className="flex items-center justify-center gap-6 px-4 py-16 text-center">
            <div>
            <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
            <p className="text-lg text-gray-600">{subtitle}</p>
            </div>
            <img src={imageSrc} alt={title} className="w-full max-w-md rounded-lg shadow-md" />
        </div>
    );
}