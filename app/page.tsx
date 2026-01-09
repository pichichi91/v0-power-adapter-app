"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, X, RotateCcw } from "lucide-react"
import { plugIconMap } from "@/components/plug-icons"
import { continentIconMap } from "@/components/continent-icons"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const adapterData = [
  { country: "Afghanistan", types: ["C", "F"], voltage: "220V", frequency: "50Hz", continent: "Asia", code: "AF" },
  { country: "Albania", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "AL" },
  { country: "Algeria", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Africa", code: "DZ" },
  { country: "Andorra", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "AD" },
  { country: "Angola", types: ["C"], voltage: "220V", frequency: "50Hz", continent: "Africa", code: "AO" },
  {
    country: "Antigua and Barbuda",
    types: ["A", "B"],
    voltage: "230V",
    frequency: "60Hz",
    continent: "North America",
    code: "AG",
  },
  {
    country: "Argentina",
    types: ["C", "I"],
    voltage: "220V",
    frequency: "50Hz",
    continent: "South America",
    code: "AR",
  },
  { country: "Armenia", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Asia", code: "AM" },
  { country: "Australia", types: ["I"], voltage: "230V", frequency: "50Hz", continent: "Oceania", code: "AU" },
  { country: "Austria", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "AT" },
  { country: "Azerbaijan", types: ["C", "F"], voltage: "220V", frequency: "50Hz", continent: "Asia", code: "AZ" },
  { country: "Bahamas", types: ["A", "B"], voltage: "120V", frequency: "60Hz", continent: "North America", code: "BS" },
  { country: "Bahrain", types: ["G"], voltage: "230V", frequency: "50Hz", continent: "Asia", code: "BH" },
  {
    country: "Bangladesh",
    types: ["C", "D", "G", "K"],
    voltage: "220V",
    frequency: "50Hz",
    continent: "Asia",
    code: "BD",
  },
  {
    country: "Barbados",
    types: ["A", "B"],
    voltage: "115V",
    frequency: "50Hz",
    continent: "North America",
    code: "BB",
  },
  { country: "Belarus", types: ["C", "F"], voltage: "220V", frequency: "50Hz", continent: "Europe", code: "BY" },
  { country: "Belgium", types: ["C", "E"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "BE" },
  {
    country: "Belize",
    types: ["A", "B", "G"],
    voltage: "110/220V",
    frequency: "60Hz",
    continent: "North America",
    code: "BZ",
  },
  { country: "Benin", types: ["C", "E"], voltage: "220V", frequency: "50Hz", continent: "Africa", code: "BJ" },
  {
    country: "Bhutan",
    types: ["C", "D", "F", "G", "M"],
    voltage: "230V",
    frequency: "50Hz",
    continent: "Asia",
    code: "BT",
  },
  { country: "Bolivia", types: ["A", "C"], voltage: "230V", frequency: "50Hz", continent: "South America", code: "BO" },
  {
    country: "Bosnia and Herzegovina",
    types: ["C", "F"],
    voltage: "230V",
    frequency: "50Hz",
    continent: "Europe",
    code: "BA",
  },
  { country: "Botswana", types: ["D", "G", "M"], voltage: "230V", frequency: "50Hz", continent: "Africa", code: "BW" },
  {
    country: "Brazil",
    types: ["C", "N"],
    voltage: "127/220V",
    frequency: "60Hz",
    continent: "South America",
    code: "BR",
  },
  { country: "Brunei", types: ["G"], voltage: "240V", frequency: "50Hz", continent: "Asia", code: "BN" },
  { country: "Bulgaria", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "BG" },
  { country: "Burkina Faso", types: ["C", "E"], voltage: "220V", frequency: "50Hz", continent: "Africa", code: "BF" },
  { country: "Burundi", types: ["C", "E"], voltage: "220V", frequency: "50Hz", continent: "Africa", code: "BI" },
  { country: "Cambodia", types: ["A", "C", "G"], voltage: "230V", frequency: "50Hz", continent: "Asia", code: "KH" },
  { country: "Cameroon", types: ["C", "E"], voltage: "220V", frequency: "50Hz", continent: "Africa", code: "CM" },
  { country: "Canada", types: ["A", "B"], voltage: "120V", frequency: "60Hz", continent: "North America", code: "CA" },
  { country: "Cape Verde", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Africa", code: "CV" },
  {
    country: "Central African Republic",
    types: ["C", "E"],
    voltage: "220V",
    frequency: "50Hz",
    continent: "Africa",
    code: "CF",
  },
  { country: "Chad", types: ["C", "D", "E", "F"], voltage: "220V", frequency: "50Hz", continent: "Africa", code: "TD" },
  { country: "Chile", types: ["C", "L"], voltage: "220V", frequency: "50Hz", continent: "South America", code: "CL" },
  { country: "China", types: ["A", "C", "I"], voltage: "220V", frequency: "50Hz", continent: "Asia", code: "CN" },
  {
    country: "Colombia",
    types: ["A", "B"],
    voltage: "110V",
    frequency: "60Hz",
    continent: "South America",
    code: "CO",
  },
  { country: "Comoros", types: ["C", "E"], voltage: "220V", frequency: "50Hz", continent: "Africa", code: "KM" },
  { country: "Congo (DRC)", types: ["C", "D"], voltage: "220V", frequency: "50Hz", continent: "Africa", code: "CD" },
  {
    country: "Congo (Republic)",
    types: ["C", "E"],
    voltage: "230V",
    frequency: "50Hz",
    continent: "Africa",
    code: "CG",
  },
  {
    country: "Costa Rica",
    types: ["A", "B"],
    voltage: "120V",
    frequency: "60Hz",
    continent: "North America",
    code: "CR",
  },
  { country: "Croatia", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "HR" },
  {
    country: "Cuba",
    types: ["A", "B", "C", "L"],
    voltage: "110/220V",
    frequency: "60Hz",
    continent: "North America",
    code: "CU",
  },
  { country: "Cyprus", types: ["G"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "CY" },
  { country: "Czech Republic", types: ["C", "E"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "CZ" },
  {
    country: "Denmark",
    types: ["C", "E", "F", "K"],
    voltage: "230V",
    frequency: "50Hz",
    continent: "Europe",
    code: "DK",
  },
  { country: "Djibouti", types: ["C", "E"], voltage: "220V", frequency: "50Hz", continent: "Africa", code: "DJ" },
  {
    country: "Dominica",
    types: ["D", "G"],
    voltage: "230V",
    frequency: "50Hz",
    continent: "North America",
    code: "DM",
  },
  {
    country: "Dominican Republic",
    types: ["A", "B"],
    voltage: "120V",
    frequency: "60Hz",
    continent: "North America",
    code: "DO",
  },
  { country: "Ecuador", types: ["A", "B"], voltage: "120V", frequency: "60Hz", continent: "South America", code: "EC" },
  { country: "Egypt", types: ["C", "F"], voltage: "220V", frequency: "50Hz", continent: "Africa", code: "EG" },
  {
    country: "El Salvador",
    types: ["A", "B"],
    voltage: "115V",
    frequency: "60Hz",
    continent: "North America",
    code: "SV",
  },
  {
    country: "Equatorial Guinea",
    types: ["C", "E"],
    voltage: "220V",
    frequency: "50Hz",
    continent: "Africa",
    code: "GQ",
  },
  { country: "Eritrea", types: ["C", "L"], voltage: "230V", frequency: "50Hz", continent: "Africa", code: "ER" },
  { country: "Estonia", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "EE" },
  { country: "Eswatini", types: ["M"], voltage: "230V", frequency: "50Hz", continent: "Africa", code: "SZ" },
  {
    country: "Ethiopia",
    types: ["C", "E", "F", "L"],
    voltage: "220V",
    frequency: "50Hz",
    continent: "Africa",
    code: "ET",
  },
  { country: "Fiji", types: ["I"], voltage: "240V", frequency: "50Hz", continent: "Oceania", code: "FJ" },
  { country: "Finland", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "FI" },
  { country: "France", types: ["C", "E"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "FR" },
  { country: "Gabon", types: ["C"], voltage: "220V", frequency: "50Hz", continent: "Africa", code: "GA" },
  { country: "Gambia", types: ["G"], voltage: "230V", frequency: "50Hz", continent: "Africa", code: "GM" },
  { country: "Georgia", types: ["C", "F"], voltage: "220V", frequency: "50Hz", continent: "Asia", code: "GE" },
  { country: "Germany", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "DE" },
  { country: "Ghana", types: ["D", "G"], voltage: "230V", frequency: "50Hz", continent: "Africa", code: "GH" },
  { country: "Greece", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "GR" },
  { country: "Grenada", types: ["G"], voltage: "230V", frequency: "50Hz", continent: "North America", code: "GD" },
  {
    country: "Guatemala",
    types: ["A", "B"],
    voltage: "120V",
    frequency: "60Hz",
    continent: "North America",
    code: "GT",
  },
  { country: "Guinea", types: ["C", "F", "K"], voltage: "220V", frequency: "50Hz", continent: "Africa", code: "GN" },
  { country: "Guinea-Bissau", types: ["C"], voltage: "220V", frequency: "50Hz", continent: "Africa", code: "GW" },
  {
    country: "Guyana",
    types: ["A", "B", "D", "G"],
    voltage: "120/240V",
    frequency: "60Hz",
    continent: "South America",
    code: "GY",
  },
  { country: "Haiti", types: ["A", "B"], voltage: "110V", frequency: "60Hz", continent: "North America", code: "HT" },
  {
    country: "Honduras",
    types: ["A", "B"],
    voltage: "110V",
    frequency: "60Hz",
    continent: "North America",
    code: "HN",
  },
  { country: "Hong Kong", types: ["G"], voltage: "220V", frequency: "50Hz", continent: "Asia", code: "HK" },
  { country: "Hungary", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "HU" },
  { country: "Iceland", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "IS" },
  { country: "India", types: ["C", "D", "M"], voltage: "230V", frequency: "50Hz", continent: "Asia", code: "IN" },
  { country: "Indonesia", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Asia", code: "ID" },
  { country: "Iran", types: ["C", "F"], voltage: "220V", frequency: "50Hz", continent: "Asia", code: "IR" },
  { country: "Iraq", types: ["C", "D", "G"], voltage: "230V", frequency: "50Hz", continent: "Asia", code: "IQ" },
  { country: "Ireland", types: ["G"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "IE" },
  { country: "Israel", types: ["C", "H"], voltage: "230V", frequency: "50Hz", continent: "Asia", code: "IL" },
  { country: "Italy", types: ["C", "F", "L"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "IT" },
  { country: "Ivory Coast", types: ["C", "E"], voltage: "220V", frequency: "50Hz", continent: "Africa", code: "CI" },
  { country: "Jamaica", types: ["A", "B"], voltage: "110V", frequency: "50Hz", continent: "North America", code: "JM" },
  { country: "Japan", types: ["A", "B"], voltage: "100V", frequency: "50/60Hz", continent: "Asia", code: "JP" },
  {
    country: "Jordan",
    types: ["B", "C", "D", "F", "G", "J"],
    voltage: "230V",
    frequency: "50Hz",
    continent: "Asia",
    code: "JO",
  },
  { country: "Kazakhstan", types: ["C", "F"], voltage: "220V", frequency: "50Hz", continent: "Asia", code: "KZ" },
  { country: "Kenya", types: ["G"], voltage: "240V", frequency: "50Hz", continent: "Africa", code: "KE" },
  { country: "Kiribati", types: ["I"], voltage: "240V", frequency: "50Hz", continent: "Oceania", code: "KI" },
  { country: "Kosovo", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "XK" },
  { country: "Kuwait", types: ["C", "G"], voltage: "240V", frequency: "50Hz", continent: "Asia", code: "KW" },
  { country: "Kyrgyzstan", types: ["C", "F"], voltage: "220V", frequency: "50Hz", continent: "Asia", code: "KG" },
  {
    country: "Laos",
    types: ["A", "B", "C", "E", "F"],
    voltage: "230V",
    frequency: "50Hz",
    continent: "Asia",
    code: "LA",
  },
  { country: "Latvia", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "LV" },
  {
    country: "Lebanon",
    types: ["A", "B", "C", "D", "G"],
    voltage: "220V",
    frequency: "50Hz",
    continent: "Asia",
    code: "LB",
  },
  { country: "Lesotho", types: ["M"], voltage: "220V", frequency: "50Hz", continent: "Africa", code: "LS" },
  { country: "Liberia", types: ["A", "B"], voltage: "120V", frequency: "60Hz", continent: "Africa", code: "LR" },
  {
    country: "Libya",
    types: ["C", "D", "F", "L"],
    voltage: "127/230V",
    frequency: "50Hz",
    continent: "Africa",
    code: "LY",
  },
  { country: "Liechtenstein", types: ["C", "J"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "LI" },
  { country: "Lithuania", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "LT" },
  { country: "Luxembourg", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "LU" },
  { country: "Macau", types: ["D", "G"], voltage: "220V", frequency: "50Hz", continent: "Asia", code: "MO" },
  {
    country: "Madagascar",
    types: ["C", "D", "E", "J", "K"],
    voltage: "127/220V",
    frequency: "50Hz",
    continent: "Africa",
    code: "MG",
  },
  { country: "Malawi", types: ["G"], voltage: "230V", frequency: "50Hz", continent: "Africa", code: "MW" },
  { country: "Malaysia", types: ["G"], voltage: "230V", frequency: "50Hz", continent: "Asia", code: "MY" },
  {
    country: "Maldives",
    types: ["A", "D", "G", "J", "K", "L"],
    voltage: "230V",
    frequency: "50Hz",
    continent: "Asia",
    code: "MV",
  },
  { country: "Mali", types: ["C", "E"], voltage: "220V", frequency: "50Hz", continent: "Africa", code: "ML" },
  { country: "Malta", types: ["G"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "MT" },
  {
    country: "Marshall Islands",
    types: ["A", "B"],
    voltage: "120V",
    frequency: "60Hz",
    continent: "Oceania",
    code: "MH",
  },
  { country: "Mauritania", types: ["C"], voltage: "220V", frequency: "50Hz", continent: "Africa", code: "MR" },
  { country: "Mauritius", types: ["C", "G"], voltage: "230V", frequency: "50Hz", continent: "Africa", code: "MU" },
  { country: "Mexico", types: ["A", "B"], voltage: "127V", frequency: "60Hz", continent: "North America", code: "MX" },
  { country: "Micronesia", types: ["A", "B"], voltage: "120V", frequency: "60Hz", continent: "Oceania", code: "FM" },
  { country: "Moldova", types: ["C", "F"], voltage: "220V", frequency: "50Hz", continent: "Europe", code: "MD" },
  {
    country: "Monaco",
    types: ["C", "D", "E", "F"],
    voltage: "230V",
    frequency: "50Hz",
    continent: "Europe",
    code: "MC",
  },
  { country: "Mongolia", types: ["C", "E"], voltage: "230V", frequency: "50Hz", continent: "Asia", code: "MN" },
  { country: "Montenegro", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "ME" },
  { country: "Morocco", types: ["C", "E"], voltage: "220V", frequency: "50Hz", continent: "Africa", code: "MA" },
  {
    country: "Mozambique",
    types: ["C", "F", "M"],
    voltage: "220V",
    frequency: "50Hz",
    continent: "Africa",
    code: "MZ",
  },
  {
    country: "Myanmar",
    types: ["C", "D", "F", "G"],
    voltage: "230V",
    frequency: "50Hz",
    continent: "Asia",
    code: "MM",
  },
  { country: "Namibia", types: ["D", "M"], voltage: "220V", frequency: "50Hz", continent: "Africa", code: "NA" },
  { country: "Nauru", types: ["I"], voltage: "240V", frequency: "50Hz", continent: "Oceania", code: "NR" },
  { country: "Nepal", types: ["C", "D", "M"], voltage: "230V", frequency: "50Hz", continent: "Asia", code: "NP" },
  { country: "Netherlands", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "NL" },
  { country: "New Zealand", types: ["I"], voltage: "230V", frequency: "50Hz", continent: "Oceania", code: "NZ" },
  {
    country: "Nicaragua",
    types: ["A", "B"],
    voltage: "120V",
    frequency: "60Hz",
    continent: "North America",
    code: "NI",
  },
  {
    country: "Niger",
    types: ["C", "D", "E", "F"],
    voltage: "220V",
    frequency: "50Hz",
    continent: "Africa",
    code: "NE",
  },
  { country: "Nigeria", types: ["D", "G"], voltage: "230V", frequency: "50Hz", continent: "Africa", code: "NG" },
  {
    country: "North Korea",
    types: ["A", "C", "F"],
    voltage: "110/220V",
    frequency: "60Hz",
    continent: "Asia",
    code: "KP",
  },
  {
    country: "North Macedonia",
    types: ["C", "F"],
    voltage: "230V",
    frequency: "50Hz",
    continent: "Europe",
    code: "MK",
  },
  { country: "Norway", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "NO" },
  { country: "Oman", types: ["C", "G"], voltage: "240V", frequency: "50Hz", continent: "Asia", code: "OM" },
  { country: "Pakistan", types: ["C", "D"], voltage: "230V", frequency: "50Hz", continent: "Asia", code: "PK" },
  { country: "Palau", types: ["A", "B"], voltage: "120V", frequency: "60Hz", continent: "Oceania", code: "PW" },
  { country: "Palestine", types: ["C", "H"], voltage: "230V", frequency: "50Hz", continent: "Asia", code: "PS" },
  { country: "Panama", types: ["A", "B"], voltage: "110V", frequency: "60Hz", continent: "North America", code: "PA" },
  { country: "Papua New Guinea", types: ["I"], voltage: "240V", frequency: "50Hz", continent: "Oceania", code: "PG" },
  { country: "Paraguay", types: ["C"], voltage: "220V", frequency: "50Hz", continent: "South America", code: "PY" },
  {
    country: "Peru",
    types: ["A", "B", "C"],
    voltage: "220V",
    frequency: "60Hz",
    continent: "South America",
    code: "PE",
  },
  { country: "Philippines", types: ["A", "B", "C"], voltage: "220V", frequency: "60Hz", continent: "Asia", code: "PH" },
  { country: "Poland", types: ["C", "E"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "PL" },
  { country: "Portugal", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "PT" },
  { country: "Qatar", types: ["D", "G"], voltage: "240V", frequency: "50Hz", continent: "Asia", code: "QA" },
  { country: "Romania", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "RO" },
  { country: "Russia", types: ["C", "F"], voltage: "220V", frequency: "50Hz", continent: "Europe", code: "RU" },
  { country: "Rwanda", types: ["C", "J"], voltage: "230V", frequency: "50Hz", continent: "Africa", code: "RW" },
  {
    country: "Saint Kitts and Nevis",
    types: ["D", "G"],
    voltage: "230V",
    frequency: "60Hz",
    continent: "North America",
    code: "KN",
  },
  { country: "Saint Lucia", types: ["G"], voltage: "230V", frequency: "50Hz", continent: "North America", code: "LC" },
  {
    country: "Saint Vincent and the Grenadines",
    types: ["A", "C", "E", "G", "I", "K"],
    voltage: "230V",
    frequency: "50Hz",
    continent: "North America",
    code: "VC",
  },
  { country: "Samoa", types: ["I"], voltage: "230V", frequency: "50Hz", continent: "Oceania", code: "WS" },
  {
    country: "San Marino",
    types: ["C", "F", "L"],
    voltage: "230V",
    frequency: "50Hz",
    continent: "Europe",
    code: "SM",
  },
  {
    country: "Sao Tome and Principe",
    types: ["C", "F"],
    voltage: "220V",
    frequency: "50Hz",
    continent: "Africa",
    code: "ST",
  },
  {
    country: "Saudi Arabia",
    types: ["A", "B", "G"],
    voltage: "127/220V",
    frequency: "60Hz",
    continent: "Asia",
    code: "SA",
  },
  {
    country: "Senegal",
    types: ["C", "D", "E", "K"],
    voltage: "230V",
    frequency: "50Hz",
    continent: "Africa",
    code: "SN",
  },
  { country: "Serbia", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "RS" },
  { country: "Seychelles", types: ["G"], voltage: "240V", frequency: "50Hz", continent: "Africa", code: "SC" },
  { country: "Sierra Leone", types: ["D", "G"], voltage: "230V", frequency: "50Hz", continent: "Africa", code: "SL" },
  { country: "Singapore", types: ["G"], voltage: "230V", frequency: "50Hz", continent: "Asia", code: "SG" },
  { country: "Slovakia", types: ["C", "E"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "SK" },
  { country: "Slovenia", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "SI" },
  {
    country: "Solomon Islands",
    types: ["G", "I"],
    voltage: "230V",
    frequency: "50Hz",
    continent: "Oceania",
    code: "SB",
  },
  { country: "Somalia", types: ["C"], voltage: "220V", frequency: "50Hz", continent: "Africa", code: "SO" },
  {
    country: "South Africa",
    types: ["C", "D", "M", "N"],
    voltage: "230V",
    frequency: "50Hz",
    continent: "Africa",
    code: "ZA",
  },
  { country: "South Korea", types: ["C", "F"], voltage: "220V", frequency: "60Hz", continent: "Asia", code: "KR" },
  { country: "South Sudan", types: ["C", "D"], voltage: "230V", frequency: "50Hz", continent: "Africa", code: "SS" },
  { country: "Spain", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "ES" },
  { country: "Sri Lanka", types: ["D", "G", "M"], voltage: "230V", frequency: "50Hz", continent: "Asia", code: "LK" },
  { country: "Sudan", types: ["C", "D"], voltage: "230V", frequency: "50Hz", continent: "Africa", code: "SD" },
  {
    country: "Suriname",
    types: ["C", "F"],
    voltage: "127V",
    frequency: "60Hz",
    continent: "South America",
    code: "SR",
  },
  { country: "Sweden", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "SE" },
  { country: "Switzerland", types: ["C", "J"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "CH" },
  { country: "Syria", types: ["C", "E", "L"], voltage: "220V", frequency: "50Hz", continent: "Asia", code: "SY" },
  { country: "Taiwan", types: ["A", "B"], voltage: "110V", frequency: "60Hz", continent: "Asia", code: "TW" },
  { country: "Tajikistan", types: ["C", "F"], voltage: "220V", frequency: "50Hz", continent: "Asia", code: "TJ" },
  { country: "Tanzania", types: ["D", "G"], voltage: "230V", frequency: "50Hz", continent: "Africa", code: "TZ" },
  {
    country: "Thailand",
    types: ["A", "B", "C", "O"],
    voltage: "220V",
    frequency: "50Hz",
    continent: "Asia",
    code: "TH",
  },
  {
    country: "Timor-Leste",
    types: ["C", "E", "F", "I"],
    voltage: "220V",
    frequency: "50Hz",
    continent: "Asia",
    code: "TL",
  },
  { country: "Togo", types: ["C"], voltage: "220V", frequency: "50Hz", continent: "Africa", code: "TG" },
  { country: "Tonga", types: ["I"], voltage: "240V", frequency: "50Hz", continent: "Oceania", code: "TO" },
  {
    country: "Trinidad and Tobago",
    types: ["A", "B"],
    voltage: "115V",
    frequency: "60Hz",
    continent: "North America",
    code: "TT",
  },
  { country: "Tunisia", types: ["C", "E"], voltage: "230V", frequency: "50Hz", continent: "Africa", code: "TN" },
  { country: "Turkey", types: ["C", "F"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "TR" },
  {
    country: "Turkmenistan",
    types: ["B", "C", "F"],
    voltage: "220V",
    frequency: "50Hz",
    continent: "Asia",
    code: "TM",
  },
  { country: "Tuvalu", types: ["I"], voltage: "230V", frequency: "50Hz", continent: "Oceania", code: "TV" },
  { country: "Uganda", types: ["G"], voltage: "240V", frequency: "50Hz", continent: "Africa", code: "UG" },
  { country: "Ukraine", types: ["C", "F"], voltage: "220V", frequency: "50Hz", continent: "Europe", code: "UA" },
  {
    country: "United Arab Emirates",
    types: ["C", "D", "G"],
    voltage: "230V",
    frequency: "50Hz",
    continent: "Asia",
    code: "AE",
  },
  { country: "United Kingdom", types: ["G"], voltage: "230V", frequency: "50Hz", continent: "Europe", code: "GB" },
  {
    country: "United States",
    types: ["A", "B"],
    voltage: "120V",
    frequency: "60Hz",
    continent: "North America",
    code: "US",
  },
  {
    country: "Uruguay",
    types: ["C", "F", "L"],
    voltage: "230V",
    frequency: "50Hz",
    continent: "South America",
    code: "UY",
  },
  { country: "Uzbekistan", types: ["C", "F"], voltage: "220V", frequency: "50Hz", continent: "Asia", code: "UZ" },
  { country: "Vanuatu", types: ["C", "G", "I"], voltage: "230V", frequency: "50Hz", continent: "Oceania", code: "VU" },
  {
    country: "Vatican City",
    types: ["C", "F", "L"],
    voltage: "230V",
    frequency: "50Hz",
    continent: "Europe",
    code: "VA",
  },
  {
    country: "Venezuela",
    types: ["A", "B"],
    voltage: "120V",
    frequency: "60Hz",
    continent: "South America",
    code: "VE",
  },
  { country: "Vietnam", types: ["A", "C"], voltage: "220V", frequency: "50Hz", continent: "Asia", code: "VN" },
  { country: "Yemen", types: ["A", "D", "G"], voltage: "230V", frequency: "50Hz", continent: "Asia", code: "YE" },
  { country: "Zambia", types: ["C", "D", "G"], voltage: "230V", frequency: "50Hz", continent: "Africa", code: "ZM" },
  { country: "Zimbabwe", types: ["D", "G"], voltage: "230V", frequency: "50Hz", continent: "Africa", code: "ZW" },
].sort((a, b) => a.country.localeCompare(b.country))

const allPlugTypes = Array.from(new Set(adapterData.flatMap((item) => item.types))).sort()
const allContinents = Array.from(new Set(adapterData.map((item) => item.continent))).sort()

export default function PowerAdapterPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPlugTypes, setSelectedPlugTypes] = useState<string[]>([])
  const [selectedContinents, setSelectedContinents] = useState<string[]>([])
  const [modalPlugType, setModalPlugType] = useState<string | null>(null)

  // Filter countries by continent first (for cascading filters)
  const continentFilteredData = useMemo(() => {
    if (selectedContinents.length === 0) return adapterData
    return adapterData.filter((item) => selectedContinents.includes(item.continent))
  }, [selectedContinents])

  // Get available plug types based on continent selection
  const availablePlugTypes = useMemo(() => {
    return Array.from(new Set(continentFilteredData.flatMap((item) => item.types))).sort()
  }, [continentFilteredData])

  // Filter countries by all criteria
  const filteredCountries = useMemo(() => {
    return continentFilteredData.filter((item) => {
      const matchesSearch = !searchQuery.trim() || item.country.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPlugType = selectedPlugTypes.length === 0 || selectedPlugTypes.some(type => item.types.includes(type))
      return matchesSearch && matchesPlugType
    })
  }, [searchQuery, selectedPlugTypes, continentFilteredData])

  // Clear plug types that are no longer available when continent changes
  const handleContinentChange = (continent: string) => {
    setSelectedContinents(prev => {
      const newContinents = prev.includes(continent)
        ? prev.filter(c => c !== continent)
        : [...prev, continent]
      
      // Update available plug types based on new continent selection
      const newContinentData = newContinents.length === 0 
        ? adapterData 
        : adapterData.filter((item) => newContinents.includes(item.continent))
      const newAvailableTypes = Array.from(new Set(newContinentData.flatMap((item) => item.types)))
      
      // Remove selected plug types that are no longer available
      setSelectedPlugTypes(prevTypes => prevTypes.filter(type => newAvailableTypes.includes(type)))
      
      return newContinents
    })
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-mono font-semibold mb-2">Power Adapters</h1>
          <p className="text-muted-foreground">Check plug types and voltage by country</p>
        </div>

        <div className="mb-6">
          {/* Continent Filter - First */}
          <div className="mb-4">
            <div className="text-sm font-medium mb-2 text-muted-foreground">Continent</div>
            <div className="flex flex-wrap gap-2 justify-between">
              {allContinents.map((continent) => {
                const IconComponent = continentIconMap[continent as keyof typeof continentIconMap]
                const isSelected = selectedContinents.includes(continent)
                return (
                  <button
                    key={continent}
                    onClick={() => handleContinentChange(continent)}
                    title={continent}
                    className={`p-4 pb-2 rounded-md border transition-colors flex flex-col items-center justify-center flex-1 min-w-[80px] ${
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:bg-muted"
                    }`}
                  >
                    <span className="w-16 h-16 flex-shrink-0 mb-1">
                      <IconComponent />
                    </span>
                    <span className="text-xs font-medium text-center leading-tight">{continent}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Plug Type Filter - Second */}
          <div className="mb-4">
            <div className="text-sm font-medium mb-2 text-muted-foreground">Plug Type</div>
            <div className="flex flex-wrap gap-2 justify-between">
              {allPlugTypes.map((type) => {
                const IconComponent = plugIconMap[type as keyof typeof plugIconMap]
                const isSelected = selectedPlugTypes.includes(type)
                const isAvailable = availablePlugTypes.includes(type)
                return (
                  <button
                    key={type}
                    onClick={() => {
                      if (isAvailable) {
                        setSelectedPlugTypes(prev => 
                          prev.includes(type) 
                            ? prev.filter(t => t !== type)
                            : [...prev, type]
                        )
                      }
                    }}
                    disabled={!isAvailable}
                    title={isAvailable ? `Type ${type}` : `Type ${type} (not available in selected continents)`}
                    className={`p-4 pb-2 rounded-md border transition-colors flex flex-col items-center justify-center flex-1 min-w-[80px] ${
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary"
                        : isAvailable
                        ? "bg-background border-border hover:bg-muted"
                        : "bg-background border-border opacity-40 cursor-not-allowed"
                    }`}
                  >
                    <span className="w-16 h-16 flex-shrink-0 mb-1">
                      <IconComponent />
                    </span>
                    <span className="text-xs font-medium">Type {type}</span>
                  </button>
                )
              })}
              <button
                onClick={() => {
                  setSelectedPlugTypes([])
                  setSelectedContinents([])
                  setSearchQuery("")
                }}
                title="Reset filters"
                className="p-4 pb-2 rounded-md border transition-colors flex flex-col items-center justify-center flex-1 min-w-[80px] bg-background border-border hover:bg-muted"
              >
                <RotateCcw className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">Reset</span>
              </button>
            </div>
          </div>

          {/* Search - Last */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Clear Filters Button */}
          {(selectedPlugTypes.length > 0 || selectedContinents.length > 0 || searchQuery) && (
            <div className="mb-4">
              <button
                onClick={() => {
                  setSelectedPlugTypes([])
                  setSelectedContinents([])
                  setSearchQuery("")
                }}
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-muted-foreground">
          {filteredCountries.length} {filteredCountries.length === 1 ? "country" : "countries"}
        </div>

        {/* Country List */}
        <div className="grid gap-3">
          {filteredCountries.map((item) => (
            <Card key={item.country} className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <img
                      src={`https://flagcdn.com/w160/${item.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w320/${item.code.toLowerCase()}.png 2x`}
                      alt={`${item.country} flag`}
                      className="w-8 h-6 object-cover border border-border"
                    />
                    <h3 className="font-mono font-medium">{item.country}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    <span>{item.voltage}</span>
                    <span>•</span>
                    <span>{item.frequency}</span>
                    <span>•</span>
                    <span className="text-xs pt-0.5">{item.continent}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {item.types.map((type) => {
                    const IconComponent = plugIconMap[type as keyof typeof plugIconMap]
                    return (
                      <button
                        key={type}
                        onClick={() => setModalPlugType(type)}
                        className="relative flex h-12 w-12 items-center justify-center border border-border bg-muted hover:bg-muted/80 transition-colors cursor-pointer"
                        title={`Type ${type} - Click to enlarge`}
                      >
                        <IconComponent />
                        <span className="absolute bottom-0.5 right-0.5 text-[10px] font-mono font-medium opacity-50">
                          {type}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredCountries.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No countries found matching your filters</div>
        )}

        {/* Plug Type Reference */}
        <div className="mt-12 border-t border-border pt-8">
          <h2 className="text-xl font-mono font-semibold mb-4">Plug Type Reference</h2>
          <div className="grid gap-3 text-sm">
            {[
              { type: "A", desc: "North American 2-pin (ungrounded)" },
              { type: "B", desc: "North American 3-pin (grounded)" },
              { type: "C", desc: "European 2-pin (ungrounded)" },
              { type: "D", desc: "Indian 3-pin (large)" },
              { type: "E", desc: "French 2-pin with earth pin" },
              { type: "F", desc: "German 2-pin with earth clips" },
              { type: "G", desc: "British 3-pin" },
              { type: "H", desc: "Israeli 3-pin" },
              { type: "I", desc: "Australian 3-pin" },
              { type: "J", desc: "Swiss 3-pin" },
              { type: "K", desc: "Danish 3-pin" },
              { type: "L", desc: "Italian 3-pin" },
              { type: "M", desc: "South African 3-pin (large)" },
              { type: "N", desc: "Brazilian 3-pin" },
              { type: "O", desc: "Thai 3-pin" },
            ].map((plug) => {
              const IconComponent = plugIconMap[plug.type as keyof typeof plugIconMap]
              return (
                <button
                  key={plug.type}
                  onClick={() => setModalPlugType(plug.type)}
                  className="flex items-center gap-3 p-3 border border-border hover:bg-muted/50 transition-colors text-left cursor-pointer"
                >
                  <div className="relative flex h-12 w-12 items-center justify-center border border-border bg-muted flex-shrink-0">
                    <IconComponent />
                    <span className="absolute bottom-0.5 right-0.5 text-[10px] font-mono font-medium opacity-50">
                      {plug.type}
                    </span>
                  </div>
                  <div>
                    <div className="font-mono font-medium">Type {plug.type}</div>
                    <div className="text-muted-foreground">{plug.desc}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <Dialog open={modalPlugType !== null} onOpenChange={(open) => !open && setModalPlugType(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-mono">Type {modalPlugType}</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center p-8">
            <div className="relative flex h-48 w-48 items-center justify-center border-2 border-border bg-muted">
              {modalPlugType && plugIconMap[modalPlugType as keyof typeof plugIconMap]?.()}
              <span className="absolute bottom-2 right-2 text-2xl font-mono font-medium opacity-30">
                {modalPlugType}
              </span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground text-center">
            {
              [
                { type: "A", desc: "North American 2-pin (ungrounded)" },
                { type: "B", desc: "North American 3-pin (grounded)" },
                { type: "C", desc: "European 2-pin (ungrounded)" },
                { type: "D", desc: "Indian 3-pin (large)" },
                { type: "E", desc: "French 2-pin with earth pin" },
                { type: "F", desc: "German 2-pin with earth clips" },
                { type: "G", desc: "British 3-pin" },
                { type: "H", desc: "Israeli 3-pin" },
                { type: "I", desc: "Australian 3-pin" },
                { type: "J", desc: "Swiss 3-pin" },
                { type: "K", desc: "Danish 3-pin" },
                { type: "L", desc: "Italian 3-pin" },
                { type: "M", desc: "South African 3-pin (large)" },
                { type: "N", desc: "Brazilian 3-pin" },
                { type: "O", desc: "Thai 3-pin" },
              ].find((p) => p.type === modalPlugType)?.desc
            }
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
