import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./app/routing/routes.constants.js";

// ---

// -------------
// >>> ADMIN <<<
// -------------
import AdminHomeUII from "./features/admin/pages/AdminHomeUII.jsx";

// --------------------------------------------
// >>> ADMINISTRATIVE-MANAGEMENT-DEPARTMENT <<<
// --------------------------------------------
import AdministrativeManagementDepartmentHomeUI from "./features/administrative-management-department/amp/pages/AdminstrativeManagementDepartmentHomeUI.jsx";
import DIRACFormUII from "./features/administrative-management-department/amp/drafts/forms/DIRACFormUII.jsx";
import RHFormUI from "./features/administrative-management-department/amp/drafts/forms/RHFormUI.jsx";

// -----------------------------
// >>> EMERGENCY-AND-URGENCY <<<
// -----------------------------
import EmergencyAndUrgencyCareHomeUI from "./features/emergency-and-urgency-care-department/eucp/pages/EmergencyAndUrgencyCareHomeUI.jsx";

// ----------------------------------------
// >>> HEALTH-EDUCATION-SUPERINTENDENCY <<<
// ----------------------------------------
import HealthEducationSuperintendencyUI from "./features/health-education-superintendency/hes/pages/HealthEducationSuperintendencyUI.jsx";
import NEPFormUI from "./features/health-education-superintendency/hes/drafts/forms/NEPFormUI.jsx"
import NEPHomeUI from "./features/health-education-superintendency/hes/drafts/forms/NEPHomeUI.jsx";

// -------------------------------------
// >>> HEALTH-SURVEILANCE-DEPARTMENT <<<
// -------------------------------------
import HealthSurveillanceDepartmentHomeUI from "./features/health-surveilance-department/hsd/pages/HealthSurveillanceDepartamentHomeUI.jsx";
import VIEPFormUI from "./features/health-surveilance-department/hsd/drafts/forms/VIEPFormUI.jsx";
import VISAFormUII from "./features/health-surveilance-department/hsd/drafts/forms/VISAFormUII.jsx";

// ---------------------
// >>> MUNICIPAL-LAB <<<
// ---------------------
import MunicipalLabHomeUI from "./features/municipal-laboratory/ml/pages/MunicipalLabHomeUI.jsx";
import LABFormUI from "./features/municipal-laboratory/ml/drafts/forms/LABFormUI.jsx";

// -----------------------------
// >>> MUNICIPAL-HEALTH-FUND <<<
// -----------------------------
import MunicipalHealthFundHomeUI from "./features/municipal-health-fund/mhf/pages/MunicipalHealthFundHomeUI.jsx";

// ------------------------------
// >>> PHARMACEUTICAL-SERVICE <<<
// ------------------------------
import PharmaceuticalServicesHomeUI from "./features/pharmaceutical-services/ps/pages/PharmaceuticalServicesHomeUI.jsx";
import FFormUI from "./features/pharmaceutical-services/ps/drafts/forms/FFormUI.jsx";

// -------------------------
// >>> PRIMARY ATTENTION <<<
// -------------------------
import PrimaryAttentionHomeUI from "./features/primary-attention/pa/pages/PrimaryAttentionHomeUI.jsx";
import SyphilisHomeUI from "./features/primary-attention/pa/pages/SyphilisHomeUI.jsx";
import SBCFormUI from "./features/primary-attention/pa/drafts/forms/SBCFormUI.jsx";
import SBFormUI from "./features/primary-attention/pa/drafts/forms/SBFormUI.jsx";
import SdCFormUI from "./features/primary-attention/pa/drafts/forms/SdCFormUI.jsx";
import SDMFormUI from "./features/primary-attention/pa/drafts/forms/SDMFormUI.jsx";
import SISABFormUI from "./features/primary-attention/pa/drafts/forms/SISABFormUI.jsx";
import TABFormUI from "./features/primary-attention/pa/drafts/forms/TABFormUI.jsx";
import UBSForquilhasHomeUI from "./features/primary-attention/ubs/pages/UBSForquilhasHomeUI.jsx";
import CaseReportSyphilisFormUI from "./features/primary-attention/ubs/drafts/forms/CaseReportSyphilisFormUI.jsx"


// ----------------------------------
// >>> REGULATORY SUPERINTENDENCY <<<
// ----------------------------------
import RegulatorySuperintendencyHomeUI from "./features/regulatory-superintendency/rs/pages/RegulatorySuperintendencyHomeUI.jsx";



// ------------
// >>> SAMU <<<
// ------------
import SamuHomeUI from "./features/samu/samu/pages/SamuHomeUI.jsx";


// -----------------------------
// >>> SPECIALIZED ATTENTION <<<
// -----------------------------
import SpecializedAttentionHomeUI from "./features/specialized-attention/sa/pages/SpecializedAttentionHomeUI.jsx";
import AEFormUI from "./features/specialized-attention/sa/drafts/forms/AEFormUI.jsx";


// ----------------------------
// >>> STRATEGIC DEPARTMENT <<<
// ----------------------------
import StrategicDepartmentHomeUI from "./features/strategic-department/sp/pages/StrategicDepartmentHomeUI.jsx";
import DCNTFormUI from "./features/strategic-department/sp/drafts/forms/DCNT/DCNTFormUI.jsx";
import PSEFormUI from "./features/strategic-department/sp/drafts/forms/PSE/PSEFormUI.jsx";
import SMPFormUI from "./features/strategic-department/sp/drafts/forms/SMP/SMPFormUII.jsx";


// -------------------
// >>> SYSTEM HOME <<<
// -------------------
import SystemHomePageUI from "./features/system-home/sh/pages/SystemHomePageUI.jsx";

// -------------
// >>> USERS <<<
// -------------
import UserFormUII from "./features/users/pages/UserFormUII.jsx";



//--


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ADMIN */}
        <Route path={ROUTES.ADMIN_HOME_UII} element={<AdminHomeUII />} />

        {/* ADMINISTRATIVE-MANAGEMENT-DEPARTMENT */}
        <Route
          path={ROUTES.ADMINISTRATIVE_MANAGEMENT_DEPTO_HOME_UI}
          element={<AdministrativeManagementDepartmentHomeUI />}
        />
        <Route path={ROUTES.DIRAC_FORM_UI} element={<DIRACFormUII />} />
        <Route path={ROUTES.RH_FORM_UI} element={<RHFormUI />} />

        {/* EMERGENCY-AND-URGENCY */}
        <Route
          path={ROUTES.EMERGENCY_AND_URGENCY_HOME_UI}
          element={<EmergencyAndUrgencyCareHomeUI />}
        />

        {/* HEALTH-EDUCATION-SURPERINTENDENCY */}
        <Route
          path={ROUTES.HEALTH_EDUCATION_SUPERINTENDENCY_HOME_UI}
          element={<HealthEducationSuperintendencyUI />}
        />
        <Route path={ROUTES.NEP_FORM_UI} element={<NEPFormUI />} />
        <Route path={ROUTES.NEP_HOME_UI} element={<NEPHomeUI />} />

        {/* HEALTH-SURVEILANCE-DEPARTMENT */}
        <Route
          path={ROUTES.HEALTH_SURVEILLANCE_DEPARTMENT_HOME_UI}
          element={<HealthSurveillanceDepartmentHomeUI />}
        />
        <Route path={ROUTES.VISA_FORM_UII} element={<VISAFormUII />} />
        <Route path={ROUTES.VIEP_FORM_UI} element={<VIEPFormUI />} />

        {/* MUNICIPAL-LAB */}
        <Route
          path={ROUTES.MUNICIPAL_LAB_HOME_UI}
          element={<MunicipalLabHomeUI />}
        />
        <Route path={ROUTES.LAB_FORM_UI} element={<LABFormUI />} />

        {/* MUNICPAL-HEALTH-FUND */}
        <Route
          path={ROUTES.MUNICIPAL_HEALTH_FUND_HOME_UI}
          element={<MunicipalHealthFundHomeUI />}
        />

        {/* PHARMACEUTICAL-SERVICE */}
        <Route
          path={ROUTES.PHARMACEUTICAL_SERVICE_HOME_UI}
          element={<PharmaceuticalServicesHomeUI />}
        />
        <Route path={ROUTES.F_FORM_UI} element={<FFormUI />} />

        {/* PRIMARY-ATTENTION */}
        <Route
          path={ROUTES.PRIMARY_ATTENTION_HOME_UI}
          element={<PrimaryAttentionHomeUI />}
        />
        <Route
          path={ROUTES.SYPHILIS_HOME_UI}
          element={<SyphilisHomeUI />}
        />
        <Route
          path={ROUTES.SBC_FORM_UI}
          element={< SBCFormUI />}
        />
        <Route
          path={ROUTES.SB_FORM_UI}
          element={< SBFormUI />}
        />
        <Route
          path={ROUTES.SdC_FORM_UI}
          element={< SdCFormUI />}
        />
        <Route
          path={ROUTES.SDM_FORM_UI}
          element={< SDMFormUI />}
        />
        <Route
          path={ROUTES.SISAB_FORM_UI}
          element={< SISABFormUI />}
        />
        <Route
          path={ROUTES.TAB_FORM_UI}
          element={< TABFormUI />}
        />
        <Route
          path={ROUTES.UBS_FORQUILHAS_HOME_UI}
          element={< UBSForquilhasHomeUI />}
        />
        <Route
          path={ROUTES.CASE_REPORT_SYPHILIS_FORM_UI}
          element={< CaseReportSyphilisFormUI />}
        />













        {/* REGULATORY-SUPERINTENDENCY */}
        <Route
          path={ROUTES.REGULATORY_SUPERINTENDENCY_HOME_UI}
          element={<RegulatorySuperintendencyHomeUI />}
        />

        {/* SAMU */}
        <Route path={ROUTES.SAMU_HOME_UI} element={<SamuHomeUI />} />

        {/* SPECIALIZED-ATTENTION */}
        <Route
          path={ROUTES.SPECIALIZED_ATTENTION_HOME_UI}
          element={<SpecializedAttentionHomeUI />}
        />
        <Route path={ROUTES.AE_FORM_UI} element={<AEFormUI />} />

        {/* STRATEGIC-DEPARTMENT */}
        <Route
          path={ROUTES.STRATEGIC_DEPARTMENT_HOME_UI}
          element={<StrategicDepartmentHomeUI />}
        />
        <Route path={ROUTES.DCNT_FORM_UI} element={<DCNTFormUI />} />
        <Route path={ROUTES.PSE_FORM_UI} element={<PSEFormUI />} />
        <Route path={ROUTES.SMP_FORM_UI} element={<SMPFormUI />} />

        {/* SYSTEM-HOME */}
        <Route path={ROUTES.SYSTEM_HOME} element={<SystemHomePageUI />} />

        {/* USER */}
        <Route path={ROUTES.USER_FORM_UII} element={<UserFormUII />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
