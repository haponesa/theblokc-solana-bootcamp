use anchor_lang::prelude::*;

declare_id!("6YwfuJiccKjz5VDg1wLp9kSmSRD9TAWF5x2BTbJk69mb");

#[program]
pub mod postapp {
    use super::*;

    pub fn create_post(ctx: Context<CreatePost>, value: String) -> Result<()> {
        let base_account= &mut ctx.accounts.base_account;
        //base_account.value = String::from("GM, World!");
        base_account.value = value;
        Ok(())
    }

    // pub fn update_value(ctx: Context<UpdateValue>, value: String) -> Result<()> {
    //     let base_account= &mut ctx.accounts.base_account;
    //     base_account.value = value;
    //     Ok(())
    // }
}


#[derive(Accounts)]
pub struct CreatePost<'info> { 
    #[account(init, payer=user, space=9000)] 
    pub base_account : Account<'info, Init>,
    #[account(mut)]
    pub user: Signer<'info,>, //signer must sign the transaction to create the account
    pub system_program: Program<'info, System> 
}

// #[derive(Accounts)]
// pub struct UpdateValue<'info> { 
//     #[account(mut)]
//     pub base_account : Account<'info, Init>
// }

#[account] 
pub struct Init{ //The place where will describe the data structure
    pub value: String
    //pub position:u64 //number
}