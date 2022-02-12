import {Link} from 'umi';
import {PageContainer} from "@ant-design/pro-layout";

export default function HomePage() {
    return (
        <PageContainer>
            <h1>this is home</h1>
            <Link to="/cloudfunc">Go to cloudfunc</Link>
            <img src={require("/public/favicon.ico")}/>
        </PageContainer>
    );
}
