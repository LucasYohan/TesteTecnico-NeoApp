import styled from "styled-components";

const UserFormContainer = styled.div`
  background-color: #990e04;
  color: #f1e7e3;
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  animation: fadeIn 0.4s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
const Title = styled.h2`
  color: #ffffff;
  text-align: center;
  margin-bottom: 16px;
`;

const FormGroup = styled.div`
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 6px;
  color: #f1e7e3;
`;

const Input = styled.input`
  width: 85%;
  padding: 8px;
  border-radius: 8px;
  border: 2px solid #ccc;
  font-size: 14px;
  transition: all 0.3s ease;
  text-align: center;

  &:focus {
    border-color: #f1e7e3;
    box-shadow: 0 0 5px rgba(241, 231, 227, 0.5);
    outline: none;
  }
`;

const ReadOnlyInput = styled(Input)`
  background-color: #e7cec3;
  cursor: not-allowed;
`;

const SubmitButton = styled.button`
  background-color: #f1e7e3;
  color: #990e04;
  padding: 10px;
  width: 85%;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #e7cec3;
    transform: scale(1.03);
  }
`;

export default function UserProfileForm() {
    return (
        <UserFormContainer>
            <Title>Informações da Conta</Title>
            <form>
                <FormGroup>
                    <Label>Nome</Label>
                    <Input type="text" placeholder="Digite seu nome" />
                </FormGroup>

                <FormGroup>
                    <Label>Nickname</Label>
                    <Input type="text" placeholder="Digite seu nickname" />
                </FormGroup>

                <FormGroup>
                    <Label>Email</Label>
                    <Input type="email" placeholder="Digite seu e-mail" />
                </FormGroup>

                <FormGroup>
                    <Label>Email</Label>
                    <Input type="email" placeholder="Digite seu e-mail" />
                </FormGroup>

                <FormGroup>
                    <Label>Data de Criação</Label>
                    <ReadOnlyInput type="text" value="15/03/2024" readOnly />
                </FormGroup>

                <FormGroup>
                    <SubmitButton type="submit">Salvar Alterações</SubmitButton>
                </FormGroup>
            </form>
        </UserFormContainer>
    );
}
