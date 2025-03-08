import { gql } from 'graphql-request';
import {
  karateDataFrgament,
  personalDataFrgament,
  userFrgament,
} from '../fragments/fragments';

export const UpsertUserProfile = gql`
  mutation UpsertUserProfile(
    $userId: ID!
    $karateId: ID
    $personalDataId: ID
    $medicalDataId: ID
    $cinturon: Cinturon
    $kyu: KyuDan
    $dan: KyuDan
    $idNumber: String
    $idType: IdType = CEDULA_CIUDADANIA
    $birthday: String
    $phone: String
    $names: String!
    $lastNames: String!
    $bloodType: BloodTypes
    $emergencyContactName: [String!]
    $emergencyContactPhone: [String!]
    $eps: String
    $prepaidMedicine: String
    $specialConditions: [String!]
  ) {
    updateUserModel(
      data: {
        karateData: {
          upsert: {
            data: {
              create: { cinturon: $cinturon, dan: $dan, kyu: $kyu }
              update: { cinturon: $cinturon, dan: $dan, kyu: $kyu }
            }
            where: { id: $karateId }
          }
        }
        personalData: {
          upsert: {
            where: { id: $personalDataId }
            data: {
              create: { idNumber: $idNumber, idType: $idType, phone: $phone }
              update: {
                birthday: $birthday
                idNumber: $idNumber
                idType: $idType
                lastNames: $lastNames
                names: $names
                phone: $phone
              }
            }
          }
        }
        medicalData: {
          upsert: {
            MedicalData: {
              where: { id: $medicalDataId }
              data: {
                create: {
                  bloodType: $bloodType
                  emergencyContactName: $emergencyContactName
                  emergencyContactPhone: $emergencyContactPhone
                  eps: $eps
                  prepaidMedicine: $prepaidMedicine
                  specialConditions: $specialConditions
                }
                update: {
                  bloodType: $bloodType
                  emergencyContactName: $emergencyContactName
                  emergencyContactPhone: $emergencyContactPhone
                  eps: $eps
                  prepaidMedicine: $prepaidMedicine
                  specialConditions: $specialConditions
                }
              }
            }
          }
        }
      }
      where: { id: $userId }
    ) {
      ...user
      ...personalData
      ...karateData
    }
  }
  ${userFrgament}
  ${personalDataFrgament}
  ${karateDataFrgament}
`;
