// Utilities
import { createPinia } from "pinia";
import { createORM } from "pinia-orm";

const pinia = createPinia().use(createORM());

export default pinia;
