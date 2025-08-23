import Lead from "../models/leads.js"

export const createLead = async (req, res)=>{
    try {

      const {id} = req.user;

      console.log("current logged in user id", id);
        //to spedify the development i m using direct req.body, otherwise i will take each input to verify
        const lead = await Lead.create(req.body);
        return res.status(201).json({
            message: "Lead created successfully",
            lead,
        });        
    } catch (error) {

        return res.status(500).json({
            message: "Failed to create lead",
            error: err.message,
        })
    }
}

export const getLeads = async (req, res)=>{
   try {
     const { page = 1, limit = 10, status, source, city, state } = req.query;
 
     const filters = {};
     if (status) filters.status = status;
     if (source) filters.source = source;
     if (city) filters.city = city;
     if (state) filters.state = state;
 
     const offset = (page-1)*limit;
 
     const leads = await Lead.find(filters).skip(offset).limit(limit);
 
     const total = await Lead.countDocuments(filters); //applying filters here
 
     return res.status(200).json({
         message: "Leads fetched successfully",
         leads,
         page: page,
         limit: limit,
         total: total,
         totalPages: Math.ceil(total/limit),
     })
   } catch (err) {
        return res.status(500).json({
        message: "Failed to fetch leads",
        error: err?.message,
        });
    
   }
}

export const getLeadById = async (req, res) => {
  try {

    const {id} = req.params;
    if(!id){
        return res.status(404).json({message:"id is missing"});
    }

    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    return res.status(200).json({
      message: "Lead fetched successfully",
      lead,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch lead",
      error: err.message,
    });
  }
};

export const updateLead = async (req, res) => {
  try {

    const {id} = req.params;

    //directly taking  the req.body
    const lead = await Lead.findByIdAndUpdate(id, req.body, {
      new: true, //it is returning  updated value
    });
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    return res.status(200).json({
      message: "Lead updated successfully",
      lead,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to update lead",
      error: err?.message,
    });
  }
};

// Delete a Lead
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    return res.status(200).json({
      message: "Lead deleted successfully",
      lead,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to delete lead",
      error: err.message,
    });
  }
};

