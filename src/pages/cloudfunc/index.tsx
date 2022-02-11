import {useState} from "react";
import {getApp} from "@/tcb";
import styles from "@/pages/index.less";

export default function Hello() {
    const app = getApp();
    const [callFunctionResult, setCallFunctionResult] = useState("");

    const callFunction = async () => {
        try {
            const res = await app.callFunction({
                name: "umi-learn",
                data: {
                    foo: "bar",
                },
            });
            setCallFunctionResult(JSON.stringify(res));
        } catch (e: any) {
            setCallFunctionResult(e.message);
        }
    };

    return (
        <div className="hello">
            <h1 className={styles.title}>this is cloudfunc</h1>
            <div>
                <div>
                    <h2>调用云函数</h2>
                    <p>
                        点击
                        <a
                            href="/#"
                            onClick={(e) => {
                                e.preventDefault();
                                callFunction();
                            }}
                        >
                            调用 hello world 云函数
                        </a>
                    </p>
                    <p>
                        <b>云函数执行结果</b>
                    </p>
                    <p>{callFunctionResult}</p>
                </div>

            </div>
        </div>
    );
}
