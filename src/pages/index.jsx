import About from '@/components/About/About.jsx';
import Survey from '@/components/Survey/Survey.jsx';
import InfoPanel from '@/components/InfoPanel/InfoPanel.jsx';
import CallToAction from '@/components/CallToAction/CallToAction.jsx';

function MainPage() {
    return (
        <>
            <About />
            <Survey />
            <InfoPanel />
            <CallToAction />
        </>
    );
}

export default MainPage;
