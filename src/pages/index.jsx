import About from '@/components/About/About.jsx';
import Survey from '@/components/Survey/Survey.jsx';
import Infopanel from '@/components/Infopanel/Infopanel.jsx';
import CallToAction from '@/components/CallToAction/CallToAction';
import SyrveyQuestions from '@/components/SyrveyQuestions/SyrveyQuestions';

function MainPage() {
    return (
        <>
            <About />
            <Survey />
            <Infopanel />
            <CallToAction />
            <SyrveyQuestions />
        </>
    );
}

export default MainPage;
