use solana_program::{
    account_info::AccountInfo, 
    entrypoint, 
    entrypoint::ProgramResult, 
    msg, 
    pubkey::Pubkey, 
};

// use {
//     borsh::BorshDeserialize, solana_program::program_error::ProgramError,
// };

entrypoint!(process_instruction);

fn process_instruction (
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {

    msg!("{}, {}, {:?}", program_id, accounts.len(), instruction_data);
    Ok(())
}

//entrypoint!(process_instruction);
// cargo-build-sbf