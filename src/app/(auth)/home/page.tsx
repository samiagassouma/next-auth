import Section1 from "@/components/Home/section1";

export default function HomePage() {
    return (
        <div className="h-screen bg-gray-100">
            <Section1
                title="Find Perfect Candidate"
                subtitle="Connect with thousands of qualified candidates and build your dream team
with our powerful recruiting tools."
                imageSrc="/home/candidate.png"
            />
        </div>
    );
}