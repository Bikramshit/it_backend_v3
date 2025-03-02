import mongoose from "mongoose";
import validator from "validator";


const schema = mongoose.Schema({
    FormId:{
        type:mongoose.Schema.ObjectId,
        ref:"ItForm"
    },
    FormName:{type : String},
    assessment_year:{type:String},
    financial_year:{type:String},
    currentState:{type:String, default:"salary"},
    createdAt:{
        type:Date,
        default:Date.now
    },
    submitStatus:{
        type:String,
        enum:["Yes", "No"],
        default:"No"
    },
    reSubmission:{
      type:Boolean, 
      default:false
    },
    submitTime:{
        type:Date
    },
    updateStatus:{
        type:Number,
        default:0
    },
    remark:{
        type:String,
        default:''
    },
    seen:{
        type:String,
        enum:["Yes", "No"],
        default:"No"
    },
    documentStatus:{
      type:String,
      default:''
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    name:{
        type:String
    },
    pan:{
        type:String,
        maxLength: 10,

    },
    aadhaar:{type:Number},
    email:{
        type:String,
        validate: [validator.isEmail, "Please Enter a valid email"],

    },
    phone:{type:String},
    dob:{type:Date},
    department:{type:String},
    designation:{type:String},
    category:{type:String},
    employer:{
        type:String,
        default:"Aliah University"
    },
    contactual:{
        type:String,
        enum:["Yes", "No"]
    },
    pay_slip:{
        public_id: {
          type: String,
        },
        url: {
            type: String,
          },
    },
    lip_c_file:{
        public_id: {
          type: String,
        },
        url: {
            type: String,
          },
    },
    ppf_c_file:{
        public_id: {
          type: String,
        },
        url: {
            type: String,
          },
    },
    ssc_file:{
        public_id: {
          type: String,
        },
        url: {
            type: String,
          },
    },
    child_file:{
        public_id: {
          type: String,
        },
        url: {
            type: String,
          },
    },
    payment_hbl_file:{
      public_id: {
        type: String,
      },
      url: {
          type: String,
        },
  },
  medical_ind_file:{
    public_id: {
      type: String,
    },
    url: {
        type: String,
      },
  },
  medical_sr_file:{
    public_id: {
      type: String,
    },
    url: {
        type: String,
      },
},
handicap_file:{
  public_id: {
    type: String,
  },
  url: {
      type: String,
    },
},
education_file:{
  public_id: {
    type: String,
  },
  url: {
      type: String,
    },
},
nps_file:{
  public_id: {
    type: String,
  },
  url: {
      type: String,
    },
},
donation_file:{
  public_id: {
    type: String,
  },
  url: {
      type: String,
    },
},
electric_file:{
  public_id: {
    type: String,
  },
  url: {
      type: String,
    },
},
extra_file:{
  public_id: {
    type: String,
  },
  url: {
      type: String,
    },
},
    input_file:{
        public_id: {
          type: String,
        },
        url: {
            type: String,
          },
    },
    input2_file:{
        public_id: {
          type: String,
        },
        url: {
            type: String,
          },
    },
    input3_file:{
        public_id: {
          type: String,
        },
        url: {
            type: String,
          },
    },
    landords_file1:{
        public_id: {
          type: String,
        },
        url: {
            type: String,
          },
    },
    landords_file2:{
        public_id: {
          type: String,
        },
        url: {
            type: String,
          },
    },
    landords_file3:{
        public_id: {
          type: String,
        },
        url: {
            type: String,
          },
    },
    landords_file4:{
        public_id: {
          type: String,
        },
        url: {
            type: String,
          },
    },
    hbl_file:{
        public_id: {
          type: String,
        },
        url: {
            type: String,
          },
    },

    
    having_arrear_s:{type:String, enum:["No", "Yes"], default:"No"},
    having_arrear_f:{type:String, enum:["No", "Yes"], default:"No"},
    basic_s1:{type:Number, default:0},
    basic_s2:{type:Number, default:0},
    basic_s3:{type:Number, default:0},
    basic_s4:{type:Number, default:0},
    basic_s4:{type:Number, default:0},
    basic_s5:{type:Number, default:0},
    basic_s6:{type:Number, default:0},
    basic_s7:{type:Number, default:0},
    basic_s8:{type:Number, default:0},
    basic_s9:{type:Number, default:0},
    basic_s10:{type:Number, default:0},
    basic_s11:{type:Number, default:0},
    basic_s12:{type:Number, default:0},
    basic_s13:{type:Number, default:0},

    rate_s1:{type:Number, default:0},
    rate_s2:{type:Number, default:0},
    rate_s3:{type:Number, default:0},
    rate_s4:{type:Number, default:0},
    rate_s5:{type:Number, default:0},
    rate_s6:{type:Number, default:0},
    rate_s7:{type:Number, default:0},
    rate_s8:{type:Number, default:0},
    rate_s9:{type:Number, default:0},
    rate_s10:{type:Number, default:0},
    rate_s11:{type:Number, default:0},
    rate_s12:{type:Number, default:0},
    rate_s13:{type:Number, default:0},

    da_s1:{type:Number, default:0},
    da_s2:{type:Number, default:0},
    da_s3:{type:Number, default:0},
    da_s4:{type:Number, default:0},
    da_s5:{type:Number, default:0},
    da_s6:{type:Number, default:0},
    da_s7:{type:Number, default:0},
    da_s8:{type:Number, default:0},
    da_s9:{type:Number, default:0},
    da_s10:{type:Number, default:0},
    da_s11:{type:Number, default:0},
    da_s12:{type:Number, default:0},
    da_s13:{type:Number, default:0},
    
    hra_s1:{type:Number, default:0},
    hra_s2:{type:Number, default:0},
    hra_s3:{type:Number, default:0},
    hra_s4:{type:Number, default:0},
    hra_s5:{type:Number, default:0},
    hra_s6:{type:Number, default:0},
    hra_s7:{type:Number, default:0},
    hra_s8:{type:Number, default:0},
    hra_s9:{type:Number, default:0},
    hra_s10:{type:Number, default:0},
    hra_s11:{type:Number, default:0},
    hra_s12:{type:Number, default:0},
    hra_s13:{type:Number, default:0},

    ma_s1:{type:Number, default:0},
    ma_s2:{type:Number, default:0},
    ma_s3:{type:Number, default:0},
    ma_s4:{type:Number, default:0},
    ma_s5:{type:Number, default:0},
    ma_s6:{type:Number, default:0},
    ma_s7:{type:Number, default:0},
    ma_s8:{type:Number, default:0},
    ma_s9:{type:Number, default:0},
    ma_s10:{type:Number, default:0},
    ma_s11:{type:Number, default:0},
    ma_s12:{type:Number, default:0},
    ma_s13:{type:Number, default:0},

    adjust_s1:{type:Number, default:0},
    adjust_s2:{type:Number, default:0},
    adjust_s3:{type:Number, default:0},
    adjust_s4:{type:Number, default:0},
    adjust_s5:{type:Number, default:0},
    adjust_s6:{type:Number, default:0},
    adjust_s7:{type:Number, default:0},
    adjust_s8:{type:Number, default:0},
    adjust_s9:{type:Number, default:0},
    adjust_s10:{type:Number, default:0},
    adjust_s11:{type:Number, default:0},
    adjust_s12:{type:Number, default:0},
    adjust_s13:{type:Number, default:0},

    gross_s1:{type:Number, default:0},
    gross_s2:{type:Number, default:0},
    gross_s3:{type:Number, default:0},
    gross_s4:{type:Number, default:0},
    gross_s5:{type:Number, default:0},
    gross_s6:{type:Number, default:0},
    gross_s7:{type:Number, default:0},
    gross_s8:{type:Number, default:0},
    gross_s9:{type:Number, default:0},
    gross_s10:{type:Number, default:0},
    gross_s11:{type:Number, default:0},
    gross_s12:{type:Number, default:0},
    gross_s13:{type:Number, default:0},

    ptax_s1:{type:Number, default:0},
    ptax_s2:{type:Number, default:0},
    ptax_s3:{type:Number, default:0},
    ptax_s4:{type:Number, default:0},
    ptax_s5:{type:Number, default:0},
    ptax_s6:{type:Number, default:0},
    ptax_s7:{type:Number, default:0},
    ptax_s8:{type:Number, default:0},
    ptax_s9:{type:Number, default:0},
    ptax_s10:{type:Number, default:0},
    ptax_s11:{type:Number, default:0},
    ptax_s12:{type:Number, default:0},
    ptax_s13:{type:Number, default:0},

    aupf_s1:{type:Number, default:0},
    aupf_s2:{type:Number, default:0},
    aupf_s3:{type:Number, default:0},
    aupf_s4:{type:Number, default:0},
    aupf_s5:{type:Number, default:0},
    aupf_s6:{type:Number, default:0},
    aupf_s7:{type:Number, default:0},
    aupf_s8:{type:Number, default:0},
    aupf_s9:{type:Number, default:0},
    aupf_s10:{type:Number, default:0},
    aupf_s11:{type:Number, default:0},
    aupf_s12:{type:Number, default:0},
    aupf_s13:{type:Number, default:0},

    sf_s1:{type:Number, default:0},
    sf_s2:{type:Number, default:0},
    sf_s3:{type:Number, default:0},
    sf_s4:{type:Number, default:0},
    sf_s5:{type:Number, default:0},
    sf_s6:{type:Number, default:0},
    sf_s7:{type:Number, default:0},
    sf_s8:{type:Number, default:0},
    sf_s9:{type:Number, default:0},
    sf_s10:{type:Number, default:0},
    sf_s11:{type:Number, default:0},
    sf_s12:{type:Number, default:0},
    sf_s13:{type:Number, default:0},

    income_s1:{type:Number, default:0},
    income_s2:{type:Number, default:0},
    income_s3:{type:Number, default:0},
    income_s4:{type:Number, default:0},
    income_s5:{type:Number, default:0},
    income_s6:{type:Number, default:0},
    income_s7:{type:Number, default:0},
    income_s8:{type:Number, default:0},
    income_s9:{type:Number, default:0},
    income_s10:{type:Number, default:0},
    income_s11:{type:Number, default:0},
    income_s12:{type:Number, default:0},
    income_s13:{type:Number, default:0},

    netsal_s1:{type:Number, default:0},
    netsal_s2:{type:Number, default:0},
    netsal_s3:{type:Number, default:0},
    netsal_s4:{type:Number, default:0},
    netsal_s5:{type:Number, default:0},
    netsal_s6:{type:Number, default:0},
    netsal_s7:{type:Number, default:0},
    netsal_s8:{type:Number, default:0},
    netsal_s9:{type:Number, default:0},
    netsal_s10:{type:Number, default:0},
    netsal_s11:{type:Number, default:0},
    netsal_s12:{type:Number, default:0},
    netsal_s13:{type:Number, default:0},
    
    gas_s:{type:Number, default:0},
    lpt_s:{type:Number, default:0},
    laupf_s:{type:Number, default:0},
    ltds_s:{type:Number, default:0},
    nas_s:{type:Number, default:0},

    
    basic_f1:{type:Number, default:0},
    basic_f2:{type:Number, default:0},
    basic_f3:{type:Number, default:0},
    basic_f4:{type:Number, default:0},
    basic_f4:{type:Number, default:0},
    basic_f5:{type:Number, default:0},
    basic_f6:{type:Number, default:0},
    basic_f7:{type:Number, default:0},
    basic_f8:{type:Number, default:0},
    basic_f9:{type:Number, default:0},
    basic_f10:{type:Number, default:0},
    basic_f11:{type:Number, default:0},
    basic_f12:{type:Number, default:0},
    basic_f13:{type:Number, default:0},

    rate_f1:{type:Number, default:0},
    rate_f2:{type:Number, default:0},
    rate_f3:{type:Number, default:0},
    rate_f4:{type:Number, default:0},
    rate_f5:{type:Number, default:0},
    rate_f6:{type:Number, default:0},
    rate_f7:{type:Number, default:0},
    rate_f8:{type:Number, default:0},
    rate_f9:{type:Number, default:0},
    rate_f10:{type:Number, default:0},
    rate_f11:{type:Number, default:0},
    rate_f12:{type:Number, default:0},
    rate_f13:{type:Number, default:0},

    da_f1:{type:Number, default:0},
    da_f2:{type:Number, default:0},
    da_f3:{type:Number, default:0},
    da_f4:{type:Number, default:0},
    da_f5:{type:Number, default:0},
    da_f6:{type:Number, default:0},
    da_f7:{type:Number, default:0},
    da_f8:{type:Number, default:0},
    da_f9:{type:Number, default:0},
    da_f10:{type:Number, default:0},
    da_f11:{type:Number, default:0},
    da_f12:{type:Number, default:0},
    da_f13:{type:Number, default:0},
    
    hra_f1:{type:Number, default:0},
    hra_f2:{type:Number, default:0},
    hra_f3:{type:Number, default:0},
    hra_f4:{type:Number, default:0},
    hra_f5:{type:Number, default:0},
    hra_f6:{type:Number, default:0},
    hra_f7:{type:Number, default:0},
    hra_f8:{type:Number, default:0},
    hra_f9:{type:Number, default:0},
    hra_f10:{type:Number, default:0},
    hra_f11:{type:Number, default:0},
    hra_f12:{type:Number, default:0},
    hra_f13:{type:Number, default:0},

    ma_f1:{type:Number, default:0},
    ma_f2:{type:Number, default:0},
    ma_f3:{type:Number, default:0},
    ma_f4:{type:Number, default:0},
    ma_f5:{type:Number, default:0},
    ma_f6:{type:Number, default:0},
    ma_f7:{type:Number, default:0},
    ma_f8:{type:Number, default:0},
    ma_f9:{type:Number, default:0},
    ma_f10:{type:Number, default:0},
    ma_f11:{type:Number, default:0},
    ma_f12:{type:Number, default:0},
    ma_f13:{type:Number, default:0},

    gross_f1:{type:Number, default:0},
    gross_f2:{type:Number, default:0},
    gross_f3:{type:Number, default:0},
    gross_f4:{type:Number, default:0},
    gross_f5:{type:Number, default:0},
    gross_f6:{type:Number, default:0},
    gross_f7:{type:Number, default:0},
    gross_f8:{type:Number, default:0},
    gross_f9:{type:Number, default:0},
    gross_f10:{type:Number, default:0},
    gross_f11:{type:Number, default:0},
    gross_f12:{type:Number, default:0},
    gross_f13:{type:Number, default:0},

    ptax_f1:{type:Number, default:0},
    ptax_f2:{type:Number, default:0},
    ptax_f3:{type:Number, default:0},
    ptax_f4:{type:Number, default:0},
    ptax_f5:{type:Number, default:0},
    ptax_f6:{type:Number, default:0},
    ptax_f7:{type:Number, default:0},
    ptax_f8:{type:Number, default:0},
    ptax_f9:{type:Number, default:0},
    ptax_f10:{type:Number, default:0},
    ptax_f11:{type:Number, default:0},
    ptax_f12:{type:Number, default:0},
    ptax_f13:{type:Number, default:0},

    aupf_f1:{type:Number, default:0},
    aupf_f2:{type:Number, default:0},
    aupf_f3:{type:Number, default:0},
    aupf_f4:{type:Number, default:0},
    aupf_f5:{type:Number, default:0},
    aupf_f6:{type:Number, default:0},
    aupf_f7:{type:Number, default:0},
    aupf_f8:{type:Number, default:0},
    aupf_f9:{type:Number, default:0},
    aupf_f10:{type:Number, default:0},
    aupf_f11:{type:Number, default:0},
    aupf_f12:{type:Number, default:0},
    aupf_f13:{type:Number, default:0},

    sf_f1:{type:Number, default:0},
    sf_f2:{type:Number, default:0},
    sf_f3:{type:Number, default:0},
    sf_f4:{type:Number, default:0},
    sf_f5:{type:Number, default:0},
    sf_f6:{type:Number, default:0},
    sf_f7:{type:Number, default:0},
    sf_f8:{type:Number, default:0},
    sf_f9:{type:Number, default:0},
    sf_f10:{type:Number, default:0},
    sf_f11:{type:Number, default:0},
    sf_f12:{type:Number, default:0},
    sf_f13:{type:Number, default:0},

    income_f1:{type:Number, default:0},
    income_f2:{type:Number, default:0},
    income_f3:{type:Number, default:0},
    income_f4:{type:Number, default:0},
    income_f5:{type:Number, default:0},
    income_f6:{type:Number, default:0},
    income_f7:{type:Number, default:0},
    income_f8:{type:Number, default:0},
    income_f9:{type:Number, default:0},
    income_f10:{type:Number, default:0},
    income_f11:{type:Number, default:0},
    income_f12:{type:Number, default:0},
    income_f13:{type:Number, default:0},

    netsal_f1:{type:Number, default:0},
    netsal_f2:{type:Number, default:0},
    netsal_f3:{type:Number, default:0},
    netsal_f4:{type:Number, default:0},
    netsal_f5:{type:Number, default:0},
    netsal_f6:{type:Number, default:0},
    netsal_f7:{type:Number, default:0},
    netsal_f8:{type:Number, default:0},
    netsal_f9:{type:Number, default:0},
    netsal_f10:{type:Number, default:0},
    netsal_f11:{type:Number, default:0},
    netsal_f12:{type:Number, default:0},
    netsal_f13:{type:Number, default:0},

    gas_f:{type:Number, default:0},
    lpt_f:{type:Number, default:0},
    laupf_f:{type:Number, default:0},
    ltds_f:{type:Number, default:0},
    nas_f:{type:Number, default:0},

    aupf_c:{type:Number, default:0},
    epf_c:{type:Number, default:0},
    sf_c:{type:Number, default:0},
    lip_c:{type:Number, default:0},
    ppf_c:{type:Number, default:0},
    ssy_c:{type:Number, default:0},
    cs_c:{type:Number, default:0},
    phb_c:{type:Number, default:0},
    inp_n1:{type:String, default:''},
    inp_n2:{type:String, default:''},
    inp_n3:{type:String, default:''},    
    input1:{type:Number, default:0},
    input2:{type:Number, default:0},
    input3:{type:Number, default:0},
    deductible_80c:{type:Number, default:0},
    deductible_80c2:{type:Number, default:0},
    mii1_c:{type:Number, default:0},
    mii2_c:{type:Number, default:0},
    mii3_c:{type:Number, default:0},
    mis1_c:{type:Number, default:0},
    mis2_c:{type:Number, default:0},
    mis3_c:{type:Number, default:0},
    deductible_80d:{type:Number, default:0},
    disability_c:{type:String, default:"Select--"},
    disability_c2:{type:Number, default:0},
    iel_c:{type:Number, default:0},
    nps_c:{type:Number, default:0},
    ihbl_c:{type:Number, default:0},
    ihbl_c2:{type:Number, default:0},
    isb_c:{type:Number, default:0},
    isb_c2:{type:Number, default:0},
    donation_c:{type:Number, default:0},
    electric_c:{type:Number, default:0},
    ex_sec:{type:String, default:''},
    ex_i:{type:String, default:''},
    ex_t:{type:Number, default:0},
    chapter_total:{type:Number, default:0},

    rent_e:{type:Number, default:0},
    rent_n:{type:Number, default:0},
    r_ten_e:{type:Number, default:0},
    r_ten_n:{type:Number, default:0},
    living_m_e:{type:Number, default:0},
    living_m_n:{type:Number, default:0},
    non_living_m_e:{type:Number, default:0},
    non_living_m_n:{type:Number, default:0},
    actual_hra_e:{type:Number, default:0},
    actual_hra_n:{type:Number, default:0},
    hra_exempt_e:{type:Number, default:0},
    hra_exempt_n:{type:Number, default:0},
    live_in_e:{type:String, enum:["Select--","Yes", "No"], default:"Select--"},
    live_in_n:{type:String, enum:["Select--","Yes", "No"], default:"Select--"},
    exceed_lakh:{type:String, enum:["Yes", "No"], default:"No"},
    pan1:{type:String, default:''},
    pan2:{type:String, default:''},
    pan3:{type:String, default:''},
    pan4:{type:String, default:''},

    name1:{type:String, default:''},
    name2:{type:String, default:''},
    name3:{type:String, default:''},
    name4:{type:String, default:''},
    count:{type:Number, default:0},
    nol:{type:Number, default:0},

    dor:{
        type:Date
    },
    it_status:{
        type:String,
        enum:["INDIVIDUAL", "SR.CITIZEN"],
        default:"INDIVIDUAL"        
    },
    gross_it_o:{type:Number,default:0},
    gross_it_n:{type:Number,default:0},
    bonus_it:{type:Number,default:0},
    bonus_it_o:{type:Number, default:0},
    bonus_it_n:{type:Number, default:0},
    hono_it :{type:Number, default:0},   
    honoo_it :{type:Number, default:0},  
    honoo_it2 :{type:Number, default:0},  
    current_it_o:{type:Number,default:0},
    current_it_n:{type:Number,default:0},
    previous_it_o:{type:Number,default:0},
    previous_it_n:{type:Number,default:0},
    pension_it_o:{type:Number,default:0},
    pension_it_n:{type:Number,default:0},
    cvp_it_o:{type:Number,default:0},
    cvp_it_n:{type:Number,default:0},
    ten_a__it_o:{type:Number,default:0},
    ten_a__it_n:{type:Number,default:0},
    thirteen_a__it_o:{type:Number,default:0},
    thirteen_a__it_n:{type:Number,default:0},
    gsp_it_o:{type:Number,default:0},
    gsp_it_n:{type:Number,default:0},
    c_employer_it:{type:Number,default:0},
    p_employer_it:{type:Number,default:0},
    employer_it_o:{type:Number,default:0},
    employer_it_n:{type:Number,default:0},
    s_deduction_it_o:{type:Number,default:0},
    s_deduction_it_n:{type:Number,default:0},
    net_sp_it_o:{type:Number,default:0},
    net_sp_it_n:{type:Number,default:0},
    interest_hbl_it:{type:Number,default:0},
    interest_hbl_it_o:{type:Number,default:0},
    interest_hbl_it_n:{type:Number,default:0},
    savings_interest_it:{type:Number,default:0},
    other_income_it:{type:Number,default:0},
    income_it_o:{type:Number,default:0},
    income_it_n:{type:Number,default:0},
    gross_income_it_o:{type:Number,default:0},
    gross_income_it_n:{type:Number,default:0},
    // total_deduction_it_o:{type:Number,default:0},
    total_deduction_it_n:{type:Number,default:0},
    net_income_it_o:{type:Number,default:0},
    net_income_it_n:{type:Number,default:0},
    tax_income_it_o:{type:Number,default:0},
    tax_income_it_n:{type:Number,default:0},
    tax_pay_it_o:{type:Number,default:0},
    tax_pay_it_n:{type:Number,default:0},
    less_it_o:{type:Number,default:0},
    less_it_n:{type:Number,default:0},
    tar_it_o:{type:Number,default:0},
    tar_it_n:{type:Number,default:0},
    opting_for:{type:String, default:'Select--'},
    tax_per_inp:{type:String, default:''},
    tax_per_it:{type:Number,default:0},
    add_four_it:{type:Number,default:0},
    gtax_payable_it:{type:Number,default:0},
    less_relief_it:{type:Number,default:0},
    ntax_payable_it:{type:Number,default:0},
    td_sal_it:{type:Number,default:0},
    tex_payable_it:{type:String,default:''},
    tax_refund:{type:Number, default:0},

    hbl_taken_fy:{type:String, default:"Select--"},


    quality:{
        type:String,
        enum:["", "Poor", "Good", "Best"],
        default:''
    },
    design:{
        type:String,
        enum:["", "Poor", "Good", "Best"],
        default:''
    },
    tax_computation:{
        type:String,
        enum:["", "Poor", "Good", "Best"],
        default:''
    },
    time_consuming:{
        type:String,
        enum:["", "Yes", "No"],
        default:''

    },
    better_previous:{
        type:String,
        enum:["", "Yes", "No"],
        default:''
        
    },
    user_friendly:{
        type:String,
        enum:["", "Yes", "No"],
        default:''
        
    },
    need_improvement:{
        type:String,
        enum:["", "Yes", "No"],
        default:''
        
    },
    feedback:{
        type:String,
        default:''

    },

})


export const FormResponse = mongoose.model('FormResponse', schema);
