import { SetNewPassword } from '@/app/[locale]/components';

export default async function ResetPasswordPage(props: { params: Promise<{ token: string }> }) {

    const { token } = await props.params;

    return <SetNewPassword token={token}/>
}
